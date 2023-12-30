import { ConflictException } from '@nestjs/common';

export class UserExistsExepction extends ConflictException {
  constructor() {
    super('User with this email already exists');
  }
}
