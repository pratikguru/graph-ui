type PipelineType = 'A' | 'B' | 'C';

export interface IPipeline { 
  id: string;
  name: string;
  type: PipelineType;
  description: string;
}
