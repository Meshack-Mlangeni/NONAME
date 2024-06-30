namespace tapinto.Server.Models
{
    public class Token
    {
        public string accessToken { get; set; }
        public DateTime expiresAt { get; set; }
    }
}
