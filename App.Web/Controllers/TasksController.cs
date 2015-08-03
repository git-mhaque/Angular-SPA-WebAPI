using App.Web.Dtos;
using App.Web.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace App.Web.Controllers
{
    [Authorize]
    public class TasksController : ApiController
    {
        ITaskRepository _taskRepository;

        public TasksController()
        {
            _taskRepository = new TaskRepository();
        }

        public TasksController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        

        // GET api/tasks
        [AllowAnonymous]
        public IEnumerable<TaskDto> Get()
        {
            IEnumerable<TaskDto> tasks = null; 
            
            try
            {
                tasks= _taskRepository.GetTasks(true, 0, 100);
            }
            catch (ApplicationException)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }

            return tasks;
        }

        // GET api/tasks/5
        public TaskDto Get(int id)
        {
            TaskDto taskDto = null;

            try
            {
                taskDto = _taskRepository.GetTask(id);
            }
            catch (ApplicationException)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }

            return taskDto;
        }

        // POST api/tasks
        public void Post([FromBody]TaskDto task)
        {
            try
            {
                _taskRepository.SaveTask(task);
            }
            catch (ApplicationException)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
            
            
        }

        // PUT api/tasks/5
        public void Put(int id, [FromBody]TaskDto task)
        {
            try
            {
                task.Id = id;
                _taskRepository.SaveTask(task);
            }
            catch (ApplicationException)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            } 

        }

        // DELETE api/tasks/5
        /// <summary>
        /// Detletes a task by id
        /// </summary>
        /// <param name="id"></param>
        public void Delete(int id)
        {
            try
            {
                _taskRepository.DeleteTask(id);
            }
            catch (ApplicationException)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }        
        }
    }
}
