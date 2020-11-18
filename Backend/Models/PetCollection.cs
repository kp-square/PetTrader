using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class PetCollection
    {
        [Key]
        public int CollectionId { get; set; }

        [Required]
        public User CollectionOwner { get; set; }

        public int CollectionOwnerId { get; set; }

        public ICollection<Pet> Pets { get; set; }


    }
}
