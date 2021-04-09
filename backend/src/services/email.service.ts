import mail, { MailService, MailDataRequired } from '@sendgrid/mail';

class EmailService {
  private apiKey: string;
  private sgMsg: MailService;
  constructor() {
    this.apiKey = process.env.EMAIL_KEY;
    this.sgMsg = mail;
    this.sgMsg.setApiKey(this.apiKey);
  }

  public sendEmail = async (to: string, templateId: string, dynamicTemplateData: any) => {
    const msg: MailDataRequired = {
      to,
      from: process.env.EMAIL_FROM,
      templateId,
      dynamicTemplateData,
    }
    return this.sgMsg.send(msg);
  };
}

export default EmailService
