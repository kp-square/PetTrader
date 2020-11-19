using Backend.Models;
using System;

namespace Backend.Dtos
{
    public class PetBasicReadDto
    {
        public int PetId { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public bool Adopt { get; set; }

        public string Type { get; set; }

        public string Breed { get; set; }

        public int Counts { get; set; }

        public double Price { get; set; }

        public string Age { get; set; }

        public string Image { get; set; }

        public DateTime AddedOn { get; set; }

        public Transaction Transaction { get; set; }

        public User PetOwner { get; set; }

        public int PetOwnerId { get; set; }

        public bool Sold { get; set; }
    }
}
