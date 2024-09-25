import { Request } from 'express';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

export abstract class BaseService {
  @Inject(REQUEST) protected request: Request;

  protected getLang(): string {
    return this.request.language || 'en';
  }
}
