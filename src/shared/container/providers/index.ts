import { container } from "tsyringe";
import { DayJSDateProvider } from "./dateProvider/implementations/DayjsDateProvider";
import { IDateProvider } from "./dateProvider/IDateProvider";
import { EtherealMailProvider } from "./mailProvider/implementations/EtherealMailProvider";
import { IMailProvider } from "./mailProvider/IMailProvider";
import { LocalStorageProvider } from "./storageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./storageProvider/IStorageProvider";

container.registerInstance<IMailProvider>(
  "MailProvider",
  new EtherealMailProvider()
);

container.registerSingleton<IDateProvider>("DateProvider", DayJSDateProvider);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  LocalStorageProvider
);
