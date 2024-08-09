import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.SMTP_ENDPOINT,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(to: string, body: any) {
    await transport.sendMail({
        from:"kakashihatake13000@gmail.com",
        sender:"kakashihatake13000@gmail.com",
        to, 
        subject:"Hello from Zapier",
        text:body
    })

}
