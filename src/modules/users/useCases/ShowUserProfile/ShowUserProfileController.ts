import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const showUserProfileUseCase = container.resolve(ShowUserProfileUseCase);

    const userDto = await showUserProfileUseCase.execute(user);

    return response.json(userDto);
  }
}

export { ShowUserProfileController };
