import { Router } from 'express';
import { CreateUserService } from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createrUser = new CreateUserService();

    const user = await createrUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
  }
});

export { usersRouter };
