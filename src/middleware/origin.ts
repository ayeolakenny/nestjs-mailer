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
        if (address !== '167.99.218.12') {
          return res.status(403).send('Access Denied');
        }
        next();
      }
    });

    console.log('REAL', cutOrigin);
    console.log(`Request from Origin: ${origin}`);
    next();
  }
}
