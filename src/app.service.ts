import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}

  logCreatedPetition(data) {
    const message = `Petition created. Check it out at http://localhost:3000/petitions/${data.slug}`;
    console.log(
      `SENDING EMAIL TO ${data.creatorEmail} for Petition ${data.name}`,
    );
    this.mailService
      .sendMail({
        from: 'Petitions NG <tomilolaa03@gmail.com>',
        to: data.creatorEmail,
        subject: `Petition Created: ${data.name}`,
        text: message,
      })
      .then(() => {
        console.log(`PETIITON ${data.name} SENT FOR APPROVAL`);
      })
      .catch((error) => {
        console.error(error);
      });
    // console.log(`PROBLEM SENDING PETIITON ${data.name} FOR APPROVAL`);
    return;
  }
}
