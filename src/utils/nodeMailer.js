const nodeMailer = require('nodemailer');

async function sendMail(to) {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.NODE_MAILER_ID, pass: process.env.NODE_MAILER_PASSWORD },
  });
  const mailOptions = {
    from: process.env.NODE_MAILER_ID,
    to,
    subject: 'Fragrant 회원가입 인증 메일입니다.',
    html: `
    <h2>아래 이미지를 눌러 인증해주세요🙏</h2>
    <form action="${process.env.HOST}/api/auth/emailValidation" method="post">
    <label>회원가입 가능한 이메일: </label>
    <input style="border:none" type="text" name="email" value=${to} readonly></input><br><br>
    <button><img src=${process.env.HOST}/asset/favicon/apple-icon-180x180.png /></button>
    <h2>🌸향기로운 하루 되세요🏵️</h2>
    `,
  };
  await transporter.sendMail(mailOptions);
}

module.exports = sendMail;
