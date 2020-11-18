import { ResponseMessage, ResponseErrorMessage } from './';

export type GenericResponse = Promise<ResponseMessage | ResponseErrorMessage>;
