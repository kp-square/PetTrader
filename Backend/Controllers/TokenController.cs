using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
//using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IUserRepo _userRepo;

        public TokenController(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        /*[Route("/token")]*/
        [HttpPost]
        public ActionResult Create(string Email, string Password)
        {
            if (IsValidEmailAndPassword(Email, Password))
            {
                return new ObjectResult(GenerateToken(Email));
            }
            else
            {
                return BadRequest("Either email or password is invalid");
            }
        }

        private bool IsValidEmailAndPassword(string Email, string Password)
        {
            var user = _userRepo.GetUserByEmail(Email);

            return _userRepo.CheckPassword(user, Password);
        }

        private dynamic GenerateToken(string Email)
        {
            var user = _userRepo.GetUserByEmail(Email);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, Email),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                new Claim(JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.Now.AddDays(1)).ToUnixTimeSeconds().ToString())
            };

            var token = new JwtSecurityToken(
                new JwtHeader(
                    new SigningCredentials(
                            new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySecretKeyIsSomethingThatNeedsToBeKeptSecret")),
                            SecurityAlgorithms.HmacSha256)),
                new JwtPayload(claims));

            var output = new
            {
                Access_Token = new JwtSecurityTokenHandler().WriteToken(token),
                UserName = Email
            };

            return output;
        }
    }
}
