import { Request } from 'express';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

export abstract class BaseService {
  @Inject(REQUEST) protected request: Request;

  protected getLang(): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Ignore the 'property does not exist on type' error
    return this.request.language || 'en';
  }
}
