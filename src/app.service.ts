import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  logCreatedPetition(data) {
    console.log(`${data.slug} received`);
  }
}
