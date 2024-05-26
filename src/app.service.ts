import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}

  async logCreatedPetition(data) {
    const message = `Petition created. Check it out at http://localhost:3000/petitions/${data.slug}`;
    console.log(
      `SENDING EMAIL TO ${data.creatorEmail} for Petition ${data.name}`,
    );
    await this.mailService
      .sendMail({
        from: 'Petitions NG <tomilolaa03@gmail.com>',
        to: data.creatorEmail,
        subject: `Petition Created: ${data.name}`,
        template: './PetCreated_Email',
        context: {
          petitionName: data.name,
          petitionSlug: data.slug,
          creatorName: data.creatorName.split(' ')[0],
          creatorEmail: data.creatorEmail,
          petitionTag: data.name.split(':')[0].split(' ').join(''),
        },
      })
      .then(() => {
        console.log(`PETIITON ${data.name} SENT FOR APPROVAL`);
        return;
      })
      .catch((error) => {
        console.error(error);
        return;
      });
    // console.log(`PROBLEM SENDING PETIITON ${data.name} FOR APPROVAL`);
    return;
  }
}
