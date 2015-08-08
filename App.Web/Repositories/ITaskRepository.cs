using App.Web.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Web.Repositories
{
    public interface ITaskRepository
    {
        
        void SaveTask(TaskDto dto);
        void DeleteTask(int id);
        TaskDto GetTask(int id);
        IEnumerable<TaskDto> GetOutstandingTasks();
    
    }
}
