export class Exception extends Error {

  public readonly custom: boolean = true;
  public code: string;
  public details: string | undefined;

  constructor(message: string, code: string, details?: string) {
    super(message);

    this.code = code;
    this.details = details;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
