import { container } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const emailProvider = {
  ethereal: new EtherealMailProvider(),
  SES: new SESMailProvider(),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  emailProvider[process.env.EMAIL_PROVIDER]
);
