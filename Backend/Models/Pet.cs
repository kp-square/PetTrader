using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Pet
    {
        [Key]
        public int PetId { get; set; }

        [Required]
        [MaxLength(256)]
        public string Country { get; set; }

        [Required]
        [MaxLength(256)]
        public string City { get; set; }

        [Required]
        public bool Adopt { get; set; }

        [Required]
        [MaxLength(256)]
        public string Type { get; set; }

        public string Breed { get; set; }

        [Required]
        public int Counts { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public string Age { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        public DateTime AddedOn { get; set; }

        public Transaction Transaction { get; set; }

        public User PetOwner { get; set; }

        public int PetOwnerId { get; set; }

        public bool Sold { get; set; }

    }

}
