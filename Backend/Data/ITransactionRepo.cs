using Backend.Models;
using System.Collections.Generic;

namespace Backend.Data
{
    public interface ITransactionRepo
    {
        void CreateTransacation(Transaction transaction);

        IEnumerable<Transaction> GetTransactionsByBuyerId(int BuyerId);

        IEnumerable<Transaction> GetTransactionsBySellerId(int SellerId);

        Transaction GetTransactionById(int TransactionId);

        bool SaveChanges();

    }
}
