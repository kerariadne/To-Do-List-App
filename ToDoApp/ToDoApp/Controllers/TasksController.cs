using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using ToDoApp.Data;
using ToDoApp.Models;


namespace ToDoApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : Controller
    {

        private readonly TasksDbContext _tasksDbContext;
        public TasksController(TasksDbContext tasksDbContext)
        {
            _tasksDbContext = tasksDbContext;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _tasksDbContext.Tasks.ToListAsync();
            return Ok(tasks); // return list of tasks
        }

        // GET: api/tasks/{id}
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetTask([FromRoute] Guid id)
        {
            var task = await _tasksDbContext.Tasks.FirstOrDefaultAsync(x => x.Id == id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<IActionResult> AddTask([FromBody] TaskModel taskRequest)
        {
            taskRequest.Id = Guid.NewGuid();
            await _tasksDbContext.Tasks.AddAsync(taskRequest);
            await _tasksDbContext.SaveChangesAsync();
            return Ok(taskRequest);
        }

        // PUT: api/tasks/{id}
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateTask([FromRoute] Guid id, [FromBody] TaskModel updateTaskRequest)
        {
            var task = await _tasksDbContext.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            task.Id = updateTaskRequest.Id;
            task.Name = updateTaskRequest.Name;
            task.Status = updateTaskRequest.Status;
            await _tasksDbContext.SaveChangesAsync();
            return Ok(task);
        }

        // DELETE: api/tasks/{id}
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var task = await _tasksDbContext.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _tasksDbContext.Tasks.Remove(task);
            await _tasksDbContext.SaveChangesAsync();

            return Ok(task);
        }
    }


}
