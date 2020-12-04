using AutoMapper;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
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
            var date = DateTime.Parse(dict["addedOn"]);
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
        public ActionResult UpdatePet(int id, PetWriteDto updated)
        {
            var toBeUpdated = _petRepo.GetPetById(id);
            if (toBeUpdated == null)
            {
                return NotFound();
            }
            _mapper.Map(updated, toBeUpdated);
            _petRepo.UpdatePet(toBeUpdated);
            _petRepo.saveChanges();
            return NoContent();

        }

        // DELETE: api/ApiWithActions/5
        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var toBeDeleted = _petRepo.GetPetById(id);
            if (toBeDeleted == null)
            {
                return NotFound();
            }

            _petRepo.DeletePet(toBeDeleted);
            _petRepo.saveChanges();
            return NoContent();
        }
    }
}
