import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): any {
    let request = context.switchToHttp().getRequest();
    return next.handle().pipe(map((res) => res));
  }
}
