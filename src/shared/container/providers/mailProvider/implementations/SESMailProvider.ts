import { SES } from "aws-sdk";
import { createTransport, Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import { IMailProvider } from "../IMailProvider";

class SESMailProvider implements IMailProvider {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
  }

  sendMail(to: string, subject: string, variables: any, path: string): void {
    const templateString = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateString);

    const templateHtml = templateParse(variables);

    this.transporter
      .sendMail({
        from: "nodetraining@ricardopraxedes.dev",
        to,
        subject,
        html: templateHtml,
      })
      .then((info) => {
        console.log(info.envelope);
        console.log(info.messageId);
      })
      .catch((err) => console.log(err));
  }
}

export { SESMailProvider };
