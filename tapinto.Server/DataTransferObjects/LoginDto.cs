namespace tapinto.Server.DataTransferObjects
{
    public class LoginDto
    {
        public string Password { get; set; }
        public string Email { get; set; }
        public bool RememberMe { get; set; }
    }
}