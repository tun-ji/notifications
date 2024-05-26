import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('petition-created')
  logCreatedPetition(@Payload() createPetitionDto) {
    return this.appService.logCreatedPetition(createPetitionDto);
  }
}
