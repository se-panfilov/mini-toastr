export class MiniToastrError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'MiniToastrError';
  }
}
