using AutoMapper;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;


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
        [HttpPost]
        public ActionResult<PetDetailReadDto> WritePet(PetWriteDto pet)
        {
            var _pet = _mapper.Map<Pet>(pet);
            _petRepo.CreatePet(_pet);
            _petRepo.saveChanges();
            return CreatedAtRoute(nameof(GetPetById), new { id = _pet.PetId }, _pet);
        }

        // PUT: api/Pet/5
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
