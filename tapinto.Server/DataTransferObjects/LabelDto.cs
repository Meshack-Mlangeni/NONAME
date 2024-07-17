using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class LabelDto
    {
        public LabelDto(Label label)
        {
            Id = label.Id;
            Name = label.Name;
            Color = label.Color;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
    }
}
