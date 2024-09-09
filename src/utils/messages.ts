// Errors
export const notFound = (entity: string) => `${entity} not found.`;
export const missingId = 'Missing id parameter.';

export enum ApiCodes {
  // Auth
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_FORBIDDEN = 'TOKEN_FORBIDDEN',

  // General
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
}

// Success
export const getActionSuccessMsg = (
  entity: string,
  action: 'created' | 'updated' | 'deleted' | 'found',
) => `${entity} ${action} successfully.`;
