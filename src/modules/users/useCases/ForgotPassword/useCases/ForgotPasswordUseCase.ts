import { IUsersPasswordTokensRepository } from "@modules/users/repositories/IUsersPasswordTokensRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/mailProvider/IMailProvider";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import { ForgotPasswordError } from "./ForgotPasswordError";

@injectable()
class ForgotPasswordUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("MailProvider") private mailProvider: IMailProvider,
    @inject("DateProvider") private dateProvider: IDateProvider,
    @inject("UsersPasswordTokensRepository")
    private usersPasswordTokensRepository: IUsersPasswordTokensRepository
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ForgotPasswordError.UserNotFound();
    }

    const passwordToken = uuidv4();
    const expiration = this.dateProvider.addDays(1);

    this.usersPasswordTokensRepository.create(
      passwordToken,
      user.id,
      expiration
    );

    this.handleEmail(email, passwordToken);
  }

  handleEmail(email: string, passwordToken: string): void {
    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    const mailVariables = {
      link: `${process.env.RESET_PASSWORD_URL}/${passwordToken}`,
    };

    const subject = "Request to change password.";

    this.mailProvider.sendMail(email, subject, mailVariables, templatePath);
  }
}

export { ForgotPasswordUseCase };
