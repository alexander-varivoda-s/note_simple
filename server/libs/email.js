const config = require('config');
const nodemailer = require('nodemailer');
const SMTPTransport = require('nodemailer-smtp-transport');
const pug = require('pug');

const {
  gmail: { user, pass },
  transport,
} = config.get('mailer');

const smtpTransport = new SMTPTransport({
  service: transport,
  auth: {
    user,
    pass,
  },
});

const transporter = nodemailer.createTransport(smtpTransport);

module.exports = async ({ headers, subject, template, link, to, from }) => {
  const sender = config.mailer.senders[from || 'default'];
  if (!sender) {
    throw new Error(`Unknown sender: ${from}`);
  }

  const email = {
    from: {
      name: sender.fromName,
      email: sender.fromEmail,
    },
    headers,
    subject,
    to,
    html: pug.renderFile(`./templates/${template}.pug`, { link }),
  };

  await transporter.sendMail(email);
};
