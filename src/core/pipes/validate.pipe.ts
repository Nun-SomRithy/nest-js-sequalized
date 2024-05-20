import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        const response = e.getResponse();
        const message = response['message'] || e.message;
        throw new UnprocessableEntityException(this.handleError(message));
      }
    }
  }

  private handleError(errors: any) {
    if (Array.isArray(errors)) {
      return errors
        .map((error) => {
          if (error.constraints) {
            return Object.values(error.constraints).join(', ');
          }
          return error;
        })
        .join('; ');
    } else {
      return errors;
    }
  }
}
