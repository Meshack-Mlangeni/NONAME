namespace tapinto.Server.DataTransferObjects
{
    public class RegisterDto : LoginDto
    {
        public string ConfirmPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string RegisterAs { get; set; }
        public string SchoolName { get; set; }
        public string ImageData { get; set; }
    }
}