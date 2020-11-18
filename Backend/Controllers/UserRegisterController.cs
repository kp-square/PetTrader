using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRegisterController : ControllerBase
    {
        private readonly IUserRepo _userRepo;

        public UserRegisterController(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }


        // POST: api/UserRegister
        [HttpPost]
        public ActionResult RegisterUser(User user)
        {
            if (user == null)
            {
                return BadRequest("Empty user couldn't be registered");
            }
            try
            {
                _userRepo.CreateUser(user);
                _userRepo.SaveChanges();
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest("Could not register user");
            }
        }

        // PUT: api/UserRegister/5
        [HttpPut("{id}")]
        public void UpdateUserInfo(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void DeleteUser(int id)
        {
        }
    }
}
