using AutoMapper;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace Backend.Controllers
{
    //[Route("api/[controller]")]
    [Route("[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IPetRepo _petRepo;
        private readonly IMapper _mapper;

        public DashboardController(IPetRepo petRepo, IMapper mapper)
        {
            _petRepo = petRepo;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Pet>> GetPetsByUserId(int id)
        {
            //verify user
            var accessToken = Request.Headers[HeaderNames.Authorization].ToString().Split(" ").Last<string>();
            if (accessToken == "")
            {
                return Unauthorized();
            }
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(accessToken);

            var tokenS = handler.ReadToken(accessToken) as JwtSecurityToken;
            var nameid = tokenS.Claims.First(claim => claim.Type == "nameid").Value;

            if (id.ToString() != nameid)
            {
                return Unauthorized();
            }
            var pets = _petRepo.GetPetsByPetOwnerId(id);
            return Ok(pets);
        }
    }
}
