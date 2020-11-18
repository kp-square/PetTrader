using Backend.Models;
using System.Collections.Generic;

namespace Backend.Data
{
    public interface IPetRepo
    {
        IEnumerable<Pet> GetAllPets();

        IEnumerable<Pet> GetAllUnsoldPets();

        IEnumerable<Pet> GetPetsByPetCollectionId(int id);

        Pet GetPetById(int id);

        Pet CreatePet(Pet pet);

        void UpdatePet(Pet pet);

        void DeletePet(Pet pet);

        bool saveChanges();
    }
}
