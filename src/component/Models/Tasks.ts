export type TaskType = 'X' | 'Y' | 'Z';

export interface ITask {
  name: string;
  id: string;
  description: string;
  pipelineId: string;
  processPoolId: string;
  taskType: TaskType;
}


