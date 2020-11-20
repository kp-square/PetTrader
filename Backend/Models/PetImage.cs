using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class PetImage
    {
        [Key]
        public int ImageId { get; set; }

        [Required]
        public int PetId { get; set; }

        [Required]
        public Pet Pet { get; set; }

        [Required]
        public string ImageName { get; set; }
    }
}
