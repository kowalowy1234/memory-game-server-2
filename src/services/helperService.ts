import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  getValidIdORThrow(id: any) {
    const parsedId = +id;
    if (isNaN(parsedId)) {
      throw new HttpException('Id must be a number', HttpStatus.BAD_REQUEST);
    }

    return parsedId;
  }
}
