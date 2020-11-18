using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }

        public User Seller { get; set; }


        public int SellerId { get; set; }

        public User Buyer { get; set; }


        public int BuyerId { get; set; }


        public Pet Pet { get; set; }


        public int PetId { get; set; }

        public DateTime TransactionTime { get; set; }
    }
}
