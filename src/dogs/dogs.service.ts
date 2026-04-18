import { Injectable } from '@nestjs/common';
import { Dog } from './interfaces/dogs.interface';

@Injectable()
export class DogsService {
  private readonly dogs:Dog[] = [];

  create(dog: any) {
    this.dogs.push(dog);
  }

  findAll() {
    return this.dogs;
  }
}
