using Backend.Models;

namespace Backend.Data
{
    public interface IUserRepo
    {
        User GetUserByEmail(string Email);

        void CreateUser(User user);
        User GetUserById(int id);

        bool CheckPassword(User user, string Password);

        bool SaveChanges();

    }
}
