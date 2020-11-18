using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAuthController : ControllerBase
    {
        // GET: api/UserAuth
        [HttpGet]
        public IEnumerable<string> GetUserByEmail()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/UserAuth/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/UserAuth
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/UserAuth/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
