import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as dns from 'dns';

@Injectable()
export class OriginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin;

    if (!origin) {
      res.status(400).json({ error: 'Invalid' });
    }

    const cutOrigin = req.headers.origin.slice(8);
    console.log('REAL', cutOrigin);

    dns.lookup(cutOrigin, (error, address, family) => {
      if (error) {
        console.error(error);
      } else {
        console.log(
          `The ip address is ${address} and the ip version is ${family}`,
        );
      }
    });

    console.log(`Request from Origin: ${origin}`);
    next();
  }
}
