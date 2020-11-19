using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Data
{
    public class PetRepo : IPetRepo
    {
        private readonly PetsContext _petsContext;

        public PetRepo(PetsContext petsContext)
        {
            _petsContext = petsContext;
        }

        public Pet CreatePet(Pet pet)
        {
            if (pet == null)
            {
                throw new ArgumentNullException(nameof(pet));
            }
            _petsContext.Pets.Add(pet);
            return pet;
        }

        public void DeletePet(Pet pet)
        {
            if (pet == null)
            {
                throw new ArgumentNullException(nameof(pet));
            }
            _petsContext.Pets.Remove(pet);

        }

        public IEnumerable<Pet> GetAllPets()
        {
            return _petsContext.Pets.ToList();
        }

        public IEnumerable<Pet> GetAllUnsoldPets()
        {
            return _petsContext.Pets.Where(pet => pet.Sold == false);
        }

        public Pet GetPetById(int id)
        {
            return _petsContext.Pets.FirstOrDefault(p => p.PetId == id);
        }

        public IEnumerable<Pet> GetPetsByPetOwnerId(int id)
        {
            return _petsContext.Pets.Where(pet => pet.PetOwnerId == id);
        }


        public bool saveChanges()
        {
            return (_petsContext.SaveChanges() >= 0);
        }

        public void UpdatePet(Pet pet)
        {
            // Not Implemented
        }
    }
}
