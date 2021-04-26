import { container } from "tsyringe";
import { IDateProvider } from "./IDateProvider";
import { DayJSDateProvider } from "./implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayJSDateProvider);
