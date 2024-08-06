import nodemailer from "nodemailer"


const sendEmail = async ({to,subject,text,html,attachment=[]}={}) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {

            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const info = await transporter.sendMail({
        from: `"stickey Note 👻" <${process.env.EMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
        attachment
    });
    console.log(info);
    if(info.rejected.length){
        throw new Error("Rejected Email")
    }
}

export default sendEmail
