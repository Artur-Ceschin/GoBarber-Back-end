import { Router } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import multer from 'multer';
import uploadConfig from '../config/upload';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createrUser = new CreateUserService();

  const user = await createrUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export { usersRouter };
