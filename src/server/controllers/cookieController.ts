// const User = require('../models/userModel.js');
import { NextFunction, Response, Request } from 'express';

interface cookieController {
  setCookie: (req: Request, res: Response, next: NextFunction) => void;
  clearCookie: (req: Request, res: Response, next: NextFunction) => void;
}

// asyncReqHandler: (req: Request, res: Response, next: NextFunction) => void;
// syncReqHandler: (req: Request, res: Response, next: NextFunction) => void;

const cookieController: cookieController = {
  async setCookie(_req, res, next) {
    try {
      const user_id = res.locals.user._id;
      console.log('inside cookie', user_id);
      res.cookie('ct-uid', user_id, {
        httpOnly: false,
        sameSite: 'lax',
        secure: true,
      });
      console.log('post cookie');
      return next();
    } catch (error) {
      return next({
        log: 'Error occurred setting user cookie',
        status: 400,
        message: { error: 'Issue occurred in setCookie Controller' },
      });
    }
  },

  async clearCookie(_req, res, next) {
    try {
      res.clearCookie('ct-uid');
      return next();
    } catch (error) {
      return next({
        log: 'Error occurred clearing user cookie',
        status: 400,
        message: { error: 'Issue occurred in clearCookie Controller' },
      });
    }
  },
};

export default cookieController;
