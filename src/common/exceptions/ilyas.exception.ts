import { HttpException, HttpStatus } from "@nestjs/common";

export class IlyasException extends HttpException {
    constructor() {
        super('IlyasException', HttpStatus.FORBIDDEN);
    }
}