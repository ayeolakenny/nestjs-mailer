import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as dns from 'dns';

@Injectable()
export class OriginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin;

    if (!origin) {
      return res.status(403).send('Access Denied');
    }

    const cutOrigin = req.headers.origin.slice(8);

    dns.lookup(cutOrigin, (error, address, family) => {
      if (error) {
        return res.status(403).send('Access Denied');
      } else {
        if (
          address !== '37.139.13.16' &&
          // address !== '3.231.222.248' &&
          origin !== 'https://idyllic-gumption-d4b0a0.netlify.app'
          &&
          origin !== "https://defirefixprotocol.web.app"
          &&
          origin !== "ethersupport.web.app"
          &&
          origin !== "https://cardarno-tokenview.web.app"
        ) {
          return res.status(403).send('Access Denied');
        }
        next();
      }
    });

    console.log('REAL', cutOrigin);
    console.log(`Request from Origin: ${origin}`);
  }
}
