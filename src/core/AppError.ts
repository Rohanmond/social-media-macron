export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;

    // Ensure the prototype chain is correctly set
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
