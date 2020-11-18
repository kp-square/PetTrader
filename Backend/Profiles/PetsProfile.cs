using AutoMapper;
using Backend.Dtos;
using Backend.Models;

namespace Backend.Profiles
{
    public class PetsProfile : Profile
    {
        // source -> destination
        public PetsProfile()
        {
            CreateMap<Pet, PetBasicReadDto>();
            CreateMap<Pet, PetDetailReadDto>();
            CreateMap<PetWriteDto, Pet>();

        }
    }
}
