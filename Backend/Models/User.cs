using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class User
    {

        [Key]
        public int UserId { get; set; }

        [Required]
        [MaxLength(256)]
        public string UserName { get; set; }

        [Required]
        [MaxLength(256)]
        public string Email { get; set; }

        [Required]
        [MaxLength(32)]
        public string Mobile { get; set; }

        [Required]
        [MaxLength(256)]
        public string Password { get; set; }

        public bool Valid { get; set; }

        public PetCollection Pet_collection { get; set; }

        public ICollection<Transaction> Buy_transactions { get; set; }

        public ICollection<Transaction> Sell_transactions { get; set; }
    }
}
