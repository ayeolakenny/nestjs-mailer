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

    const validIps = ['167.99.218.12', '34.148.147.18'];

    dns.lookup(cutOrigin, (error, address, family) => {
      console.log(address);
      console.log(validIps.indexOf(address));
      if (error) {
        return res.status(403).send('Access Denied');
      } else {
        if (validIps.indexOf(address) === -1) {
          return res.status(403).send('Access Denied');
        }
        next();
      }
    });

    console.log('REAL', cutOrigin);
    console.log(`Request from Origin: ${origin}`);
  }
}
