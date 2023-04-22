 class MailService {

  static getInstance() {
    if (!this.instance) {
      this.instance = new MailService();
    }

    return this.instance;
  }

  static async getMails() {
    const mails = await fetch('./assets/mail.json');
    const mailResponse = await mails.json();

    return mailResponse;
  }
}

export {MailService}



