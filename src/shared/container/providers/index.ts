import { container } from "tsyringe";
import { DayJSDateProvider } from "./dateProvider/implementations/DayjsDateProvider";
import { IDateProvider } from "./dateProvider/IDateProvider";
import { EtherealMailProvider } from "./mailProvider/implementations/EtherealMailProvider";
import { IMailProvider } from "./mailProvider/IMailProvider";
import { IStorageProvider } from "./storageProvider/IStorageProvider";
import { S3StorageProvider } from "./storageProvider/implementations/S3StorageProvider";
import { LocalStorageProvider } from "./storageProvider/implementations/LocalStorageProvider";

container.registerInstance<IMailProvider>(
  "MailProvider",
  new EtherealMailProvider()
);

container.registerSingleton<IDateProvider>("DateProvider", DayJSDateProvider);

const storageProvider = {
  s3: S3StorageProvider,
  local: LocalStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  storageProvider[process.env.STORAGE_PROVIDER]
);
