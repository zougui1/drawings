import { Exception } from './Exception';

export function createError<TValues extends Record<string, any>>(errorData: IErrorData<TValues>): ApiError<TValues> {
  return class DrawerError extends Exception {
    public static readonly message: string | ((values: TValues) => string) = errorData.message;
    public static readonly code: string = errorData.code;

    constructor(values?: TValues, details?: string) {
      super('', errorData.code, details);

      if (typeof errorData.message === 'string') {
        this.message = errorData.message;
      } else if (!values) {
        throw new Error('The error values are required when used on a function message.');
      } else {
        this.message = errorData.message(values);
      }
    }
  }
}

export interface IErrorData<TValues extends Record<string, any>> {
  message: string | ((values: TValues) => string);
  code: string;
}

export type ApiErrorConstructor<TValues extends Record<string, any>> = new(values?: TValues | undefined, details?: string) => Exception;
export type ApiError<TValues = Record<string, any>> = Omit<typeof Exception, 'new'> & IErrorData<TValues> & ApiErrorConstructor<TValues>;
