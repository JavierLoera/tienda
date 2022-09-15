import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as session from 'express-session';
import { lastValueFrom, map } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject("AUTH_SERVICE") private readonly authClient: ClientProxy) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {    
    const request = context.switchToHttp().getRequest()
    const res = await lastValueFrom(this.authClient.send({ cmd: "authorization" }, { token: request.headers['authorization']?.split(' ')[1] }).pipe(map(res => res)))
    if(res.status===401){
      return
    }
    else{
      console.log(res)
      request.user=res.user
    session.user = res;
    return res
  }
}
}