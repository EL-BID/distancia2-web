

export enum State {
  INITIAL = 'initial',
  PENDING = 'pending',
  INSTANCE_CREATED = 'instance-created',
  INSTANCE_UPDATED = 'instance-updated',
  DONE = 'done',
}

export interface InvalidInput {
  [field: string]: [string];
}

export interface ErrorDetail {
  message: string;
  path: string;
  extensions?: {
    code: string;
    invalidArgs: InvalidInput;
  }
}

export interface ActionHandler {
  (id: string, action: string): void
}
