import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { extractPrimaryLanguage } from '../utils/language-utils';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const acceptLanguage = request.headers['accept-language'];

    request.language = extractPrimaryLanguage(acceptLanguage);

    return next.handle();
  }
}
