export interface IProcessPool {
  id: string;
  name: string; 
  pipelineId: string;
  taskId: Array<string>;
  type: 'A' | 'B' | 'C';
}