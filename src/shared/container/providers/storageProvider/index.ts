import { container } from "tsyringe";
import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";
import { IStorageProvider } from "./IStorageProvider";

const storageProvider = {
  s3: S3StorageProvider,
  local: LocalStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  storageProvider[process.env.STORAGE_PROVIDER]
);
