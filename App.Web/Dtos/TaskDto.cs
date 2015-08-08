using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Web.Dtos
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public DateTime? DueDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool EditMode { get; set; }
        public bool IsComplete { get; set; }
    }

}