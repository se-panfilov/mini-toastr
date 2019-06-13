export class MiniToastrError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'MiniToastrError';
  }
}
