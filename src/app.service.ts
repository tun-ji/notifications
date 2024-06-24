import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}

  async logCreatedPetition(data, channel) {
    console.log(
      `SENDING EMAIL TO ${data.creatorEmail} for Petition ${data.name}`,
    );

    try {
      await this.mailService.sendMail({
        from: 'Petitions NG <petitions@beheard.com.ng>',
        to: data.creatorEmail,
        subject: `Petition Created: ${data.name}`,
        template: './PetCreated_Email',
        context: {
          petitionName: data.name,
          petitionSlug: data.slug,
          creatorName: data.creatorName.split(' ')[0],
          creatorEmail: data.creatorEmail,
          petitionTag: data.name.split(':')[0].split(' ').join(''),
        }
      })
      console.log(`PETIITON ${data.name} SENT FOR APPROVAL`);
      channel.ack(data)
    } catch (error) {
      console.error(error);
    }
    return;
  }

  async logSignedPetition(data) {
    console.log(
      `SENDING EMAIL TO ${data.signatoryEmail} for Petition ${data.petition.name}`,
    );
    console.log(data)


    try {
      await this.mailService
      .sendMail({
        from: 'Petitions NG <petitions@beheard.com.ng>',
        to: data.signatoryEmail,
        subject: `Petition Signed: ${data.petition.name}`,
        template: './PetSigned_Email',
        context: {
          petitionName: data.petition.name,
          petitionSlug: data.petition.slug,
          signatoryName: data.signatoryName.split(' ')[0],
          signatoryEmail: data.signatoryEmail,
          petitionTag: data.petition.name.split(':')[0].split(' ').join(''),
        },
      })  
      console.log(`PETIITON ${data.petition.name} SENT FOR APPROVAL`);
      return 'true';    
    } catch (error) {
      console.error(error);      
    }

    return;
  }

  
}
