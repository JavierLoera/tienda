import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next.handle().pipe(
            map(data => {
                if (data.status == 400) {
                    throw new BadRequestException(data.message)
                }


                if (data.status == 404) {
                    throw new BadRequestException(data.message)
                }

                return data
            }))
    }
}

