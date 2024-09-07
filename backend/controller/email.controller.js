const nodemailer = require("nodemailer")

const sendEmail = async(data, req, res)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.MAIL_ID,
          pass: process.env.MP,
        },
      });
    
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Maddison Foo Koch 👻" <abc@gmail.com.com>', // sender address
          to: data.to, // list of receivers
          subject: data.subject, // Subject line
          text: data.text, // plain text body
          html: data.html // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // console.log("preview url", nodemailer.getTestMessageUrl(info))
}

module.exports = sendEmail;