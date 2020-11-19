'use strict';

class ApplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends ApplicationError {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
  toString() {
    return `${this.field}: ${super.toString()}`;
  }
}

class DatabaseError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}

class BlockchainError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = "BlockchainError";
  }
}

module.exports = {
  ApplicationError,
  DatabaseError,
  ValidationError,
  BlockchainError
}