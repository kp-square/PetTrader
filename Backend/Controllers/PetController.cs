using AutoMapper;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetController : ControllerBase
    {
        private readonly IPetRepo _petRepo;
        private readonly IMapper _mapper;

        public PetController(IPetRepo petRepo, IMapper mapper)
        {
            _petRepo = petRepo;
            _mapper = mapper;
        }
        // GET: api/Pet
        [HttpGet]
        public ActionResult<IEnumerable<PetBasicReadDto>> GetAllPets()
        {
            var allPets = _petRepo.GetAllPets();
            return Ok(_mapper.Map<IEnumerable<PetBasicReadDto>>(allPets));
        }

        // GET: api/Pet/5
        [HttpGet("{id}", Name = "GetPetById")]
        public ActionResult<PetDetailReadDto> GetPetById(int id)
        {
            var pet = _petRepo.GetPetById(id);
            return Ok(_mapper.Map<PetDetailReadDto>(pet));
        }

        // POST: api/Pet
        [Authorize]
        [HttpPost]
        public IActionResult WritePet()
        {

            var data = Request.Form;
            IFormFile file = data.Files[0];
            var dict = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            DateTime parsed = DateTime.ParseExact(dict["addedOn"].Split("+")[0],
                                      "ddd MMM dd yyyy HH:mm:ss Z",
                                       CultureInfo.InvariantCulture);

            dict["addedOn"] = parsed.ToString();

            string json = JsonConvert.SerializeObject(dict);

            PetWriteDto pet = JsonConvert.DeserializeObject<PetWriteDto>(json);
            pet.PetOwnerId = Int32.Parse(dict["addedBy"]);
            var result = new UploadController().UploadImage(file);
            var okResult = result as OkObjectResult;

            if (okResult.StatusCode == 200)
            {
                pet.Image = okResult.Value.ToString();
            }
            else
            {
                return BadRequest();
            }

            var _pet = _mapper.Map<Pet>(pet);
            _petRepo.CreatePet(_pet);
            _petRepo.saveChanges();
            return CreatedAtRoute(nameof(GetPetById), new { id = _pet.PetId }, _pet);
        }

        // PUT: api/Pet/5
        [Authorize]
        [HttpPut("{id}")]
        public ActionResult UpdatePet()
        {
            var accessToken = Request.Headers[HeaderNames.Authorization].ToString().Split(" ").Last<string>();
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(accessToken);
            var tokenS = handler.ReadToken(accessToken) as JwtSecurityToken;
            var nameid = tokenS.Claims.First(claim => claim.Type == "nameid").Value;

            var id = Int32.Parse(Request.Path.Value.Split("/").Last<string>());

            var toBeUpdated = _petRepo.GetPetById(id);

            if (toBeUpdated == null)
            {
                return NotFound();
            }

            if (toBeUpdated.PetOwnerId.ToString() != nameid)
            {
                return Unauthorized();
            }

            var data = Request.Form;
            var dict = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());


            dict["addedOn"] = toBeUpdated.AddedOn.ToString();

            string json = JsonConvert.SerializeObject(dict);

            PetWriteDto pet = JsonConvert.DeserializeObject<PetWriteDto>(json);
            pet.PetOwnerId = Int32.Parse(dict["addedBy"]);
            if (data.Files.Count() > 0)
            {
                IFormFile file = data.Files[0];
                var result = new UploadController().UploadImage(file);
                var okResult = result as OkObjectResult;

                if (okResult.StatusCode == 200)
                {
                    pet.Image = okResult.Value.ToString();
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                pet.Image = toBeUpdated.Image;
            }


            _mapper.Map(pet, toBeUpdated);
            _petRepo.UpdatePet(toBeUpdated);
            var boool = _petRepo.saveChanges();
            return NoContent();

        }

        // DELETE: api/ApiWithActions/5
        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization].ToString().Split(" ").Last<string>();
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(accessToken);
            var tokenS = handler.ReadToken(accessToken) as JwtSecurityToken;
            var nameid = tokenS.Claims.First(claim => claim.Type == "nameid").Value;

            var toBeDeleted = _petRepo.GetPetById(id);

            if (toBeDeleted == null)
            {
                return NotFound();
            }

            if (toBeDeleted.PetOwnerId.ToString() != nameid)
            {
                return Unauthorized();
            }

            _petRepo.DeletePet(toBeDeleted);
            _petRepo.saveChanges();
            return NoContent();
        }
    }
}
