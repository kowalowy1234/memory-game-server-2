import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isArray } from 'class-validator';

@Injectable()
export class HelperService {
  getValidIdORThrow(id: any) {
    const parsedId = +id;
    if (isNaN(parsedId)) {
      throw new HttpException('Id must be a number', HttpStatus.BAD_REQUEST);
    }

    return parsedId;
  }

  excludeKeyFromObjectOrObjects<O, K extends keyof O>(
    target: O | O[],
    keys: K[],
  ): Omit<O, K> | Omit<O, K>[] {
    if (isArray(target)) {
      const result: Omit<O, K>[] = [];

      for (const object of target) {
        result.push(
          Object.fromEntries(
            Object.entries(object).filter(([key]) => !keys.includes(key as K)),
          ) as Omit<O, K>,
        );
      }

      return result;
    }

    return Object.fromEntries(
      Object.entries(target).filter(([key]) => !keys.includes(key as K)),
    ) as Omit<O, K>;
  }
}
