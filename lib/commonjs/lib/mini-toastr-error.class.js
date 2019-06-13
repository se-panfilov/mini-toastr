"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

class MiniToastrError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'MiniToastrError';
  }
}

exports.MiniToastrError = MiniToastrError;
