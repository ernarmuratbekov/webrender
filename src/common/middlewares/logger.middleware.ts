import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log("Request...");
        console.log(`Here is an example demonstrating principle of operation of ${req.method}`);
        // console.log(`body: ${req.body}`);
        console.log("body:", req.body);
        next();
    }
}       