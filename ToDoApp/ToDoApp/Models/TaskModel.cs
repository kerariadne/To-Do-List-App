namespace ToDoApp.Models
{
    public class TaskModel
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Status { get; set; }
    }
}
