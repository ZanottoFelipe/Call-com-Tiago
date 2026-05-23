import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from 'src/user/domain/exceptions/DomainException';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: DomainException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();
        response.status(exception.statusCode).json({
            statusCode: exception.statusCode,
            message: exception.message,
            error: exception.name,
        });
    }
}
