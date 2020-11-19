using Backend.Models;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Data
{
    public class TransactionRepo : ITransactionRepo
    {
        private readonly PetsContext _petsContext;

        public TransactionRepo(PetsContext petsContext)
        {
            _petsContext = petsContext;
        }

        public void CreateTransacation(Transaction transaction)
        {
            _petsContext.Transactions.Add(transaction);
        }

        public Transaction GetTransactionById(int TransactionId)
        {
            return _petsContext.Transactions.FirstOrDefault(T => T.TransactionId == TransactionId);
        }

        public IEnumerable<Transaction> GetTransactionsByBuyerId(int BuyerId)
        {
            return _petsContext.Transactions.Where(T => T.BuyerId == BuyerId);
        }

        public IEnumerable<Transaction> GetTransactionsBySellerId(int SellerId)
        {
            return _petsContext.Transactions.Where(T => T.SellerId == SellerId);
        }

        public bool SaveChanges()
        {
            return _petsContext.SaveChanges() >= 0;
        }
    }
}
