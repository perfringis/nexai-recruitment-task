import { Injectable, PipeTransform } from '@nestjs/common';
import { VIN } from 'src/entity/vin';

@Injectable()
export class VINValidationPipe implements PipeTransform {
  transform(value: string): string {
    try {
      const vin = new VIN(value);
      return vin.toString();
    } catch (error) {
      throw error;
    }
  }
}
