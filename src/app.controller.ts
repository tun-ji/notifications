import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('petition-created')
  async logCreatedPetition(@Payload() createPetitionDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    console.log('PETITION EMAIL REQUEST RECEIVED')
    return await this.appService.logCreatedPetition(createPetitionDto, channel);
  }

  @EventPattern('petition-signed')
  async logSignedPetition(@Payload() createPetitionDto) {
    console.log('SIGN PETITION EMAIL REQUEST RECEIVED')
    return await this.appService.logSignedPetition(createPetitionDto);
  }
}
