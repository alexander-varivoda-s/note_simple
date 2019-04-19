const config = require('config');
const nodemailer = require('nodemailer');
const SMTPTransport = require('nodemailer-smtp-transport');
const pug = require('pug');

const transport = new SMTPTransport({
  service: config.get('mailer.transport'),
  auth: {
    user: config.get('mailer.gmail.user'),
    pass: config.get('mailer.gmail.pass'),
  },
});

const transporter = nodemailer.createTransport(transport);

module.exports = async ({ headers, subject, template, link, to, from }) => {
  const sender = config.mailer.senders[from || 'default'];
  if (!sender) {
    throw new Error(`Unknown sender: ${from}`);
  }

  const email = {};
  email.from = {
    name: sender.fromName,
    email: sender.fromEmail,
  };

  email.headers = headers;
  email.subject = subject;
  email.to = to;
  email.html = pug.renderFile(`./templates/${template}.pug`, { link });

  await transporter.sendMail(email);
};
