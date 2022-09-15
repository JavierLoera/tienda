import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class SessionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): any {
        let request = context.switchToHttp().getRequest();
        if (request.session.user == undefined) {
            throw new UnauthorizedException()
        }
        return next.handle().pipe(map(res => res))
    }
}