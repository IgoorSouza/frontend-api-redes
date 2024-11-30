type Task = {
  id: string;
  name: string;
  description: string;
  priority: string;
  assigneeId: string;
  projectId: string;
  assigneeName?: string;
  projectName?: string;
};

export default Task;
