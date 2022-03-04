import { Router } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import multer from 'multer';
import uploadConfig from '../config/upload';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateAvatar = new UpdateUserAvatarService();

      const user = await updateAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return response.status(400).json({ error: err.message });
      }
    }
  },
);

export { usersRouter };
