using App.Web.Dtos;
using App.Web.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace App.Web.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        
        public void SaveTask(TaskDto dto)
        {
            TaskItem task = null;
            
            try
            {
                using (Entities db = new Entities())
                {
                    if (dto.Id == 0) // Insert 
                    {
                        task = new TaskItem();
                    }
                    else // Updating an existing record 
                    {
                        task = db.TaskItems.SingleOrDefault(q => q.Id == dto.Id);
                        if (task == null)
                        {
                            throw new ApplicationException("Couldn't find the task to update.");

                        }
                    }

                    task.Id = dto.Id;
                    task.Title = dto.Title;
                    task.Details = dto.Details;
                    task.DueDate = dto.DueDate;
                   
                    if (dto.Id == 0)
                    {
                        task.CreatedBy = dto.CreatedBy;
                        task.CreatedDate = DateTime.Now;

                        db.TaskItems.Add(task);
                        db.SaveChanges();
                    }
                    else
                    {
                        if (dto.IsComplete) 
                        {
                            task.CompletedDate = DateTime.Now;
                        }
                        task.ModifiedBy = dto.ModifiedBy;
                        task.ModifiedDate = DateTime.Now;

                        db.TaskItems.Attach(task);
                        db.Entry(task).State = EntityState.Modified;
                        db.SaveChanges();
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteTask(int id)
        {
            try
            {
                using(Entities db = new Entities())
                {
                    TaskItem task = db.TaskItems.SingleOrDefault(q => q.Id == id);

                    if (task != null)
                    {
                        db.TaskItems.Remove(task);
                        db.SaveChanges();

                    }
                    else
                    {
                        throw new ApplicationException("Couldn't find the task");
                    
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public TaskDto GetTask(int id)
        {
            TaskDto taskDto = null;

            try
            {
                using (Entities db = new Entities())
                {
                    var task = db.TaskItems.SingleOrDefault(q => q.Id == id);

                    if (task != null)
                    {
                        taskDto = new TaskDto();
                        taskDto.Id = task.Id;
                        taskDto.Title = task.Title;
                        taskDto.Details = task.Details;
                        taskDto.DueDate = task.DueDate;
                        taskDto.IsComplete = task.CompletedDate != null;
                        taskDto.CreatedBy = task.CreatedBy;
                        taskDto.CreatedDate = task.CreatedDate;
                        taskDto.ModifiedBy = task.ModifiedBy;
                        taskDto.ModifiedDate = task.ModifiedDate;
                    }
                    else 
                    {
                        throw new ApplicationException("Couldn't find the task");
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return taskDto;        
        }


        public IEnumerable<TaskDto> GetOutstandingTasks()
        {
            IEnumerable<TaskDto> tasks = null;
            
            try
            {
                using (Entities db = new Entities())
                {
                    var query = from r in db.TaskItems
                                select r;

                    query = query.Where(q => q.CompletedDate == null);

                    tasks = (from r in query
                            select new TaskDto
                            {
                                Id = r.Id,
                                Title = r.Title,
                                Details = r.Details,
                                DueDate = r.DueDate,
                                CreatedBy = r.CreatedBy,
                                CreatedDate = r.CreatedDate,
                                ModifiedBy = r.ModifiedBy,
                                ModifiedDate = r.ModifiedDate
                            }).OrderBy(q=>q.DueDate).ToList<TaskDto>(); 
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return tasks;

        }
    }
}