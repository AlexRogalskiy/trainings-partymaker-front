export class Task {
  id: string;
  name: string;
  assignee: string;
  created: any;
  due: string;
  followUp: string;
  delegationState: string;
  description: string;
  executionId: string;
  owner: string;
  parentTaskId: string;
  priority: number;
  processDefinitionId: string;
  processInstanceId: string;
  caseExecutionId: string;
  caseDefinitionId: string;
  caseInstanceId: string;
  taskDefinitionKey: string;
  suspended: boolean;
  // key: string;
  formKey: string;
  tenantId: string;
}
