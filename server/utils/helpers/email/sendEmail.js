import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

const sendEmail = async (email, subject, payload, template) => {
    const __dirname = path.resolve();

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD,
            },
        });

        const source = fs.readFileSync(path.join(__dirname, template), 'utf8');
        const compiledTemplate = handlebars.compile(source);
        const options = () => ({
            from: process.env.APP_EMAIL,
            to: email,
            subject,
            html: compiledTemplate(payload),
        });

        const response = await transporter.sendMail(options());

        return response.messageId;
    } catch (error) {
        return new Error(error);
    }
};

export default sendEmail;
