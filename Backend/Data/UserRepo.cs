using Backend.Models;
using System.Linq;

namespace Backend.Data
{
    public class UserRepo : IUserRepo
    {
        private readonly PetsContext _petsContext;

        public UserRepo(PetsContext petsContext)
        {
            _petsContext = petsContext;
        }
        public bool CheckPassword(User user, string Password)
        {
            bool verified = BCrypt.Net.BCrypt.Verify(Password, user.Password);
            return verified;
        }

        public void CreateUser(User user)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Password = passwordHash;
            _petsContext.Users.Add(user);
        }


        public User GetUserByEmail(string Email)
        {
            return _petsContext.Users.FirstOrDefault(u => u.Email == Email);

        }

        public User GetUserById(int id)
        {
            return _petsContext.Users.FirstOrDefault(p => p.UserId == id);
        }

        public bool SaveChanges()
        {
            return _petsContext.SaveChanges() >= 0;
        }
    }
}
