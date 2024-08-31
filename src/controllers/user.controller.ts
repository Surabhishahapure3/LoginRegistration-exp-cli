/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
// import { IUser } from '../interfaces/user.interface';
import userService from '../services/user.service';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';

class UserController {
  public UserService = new userService();

  
  

  /**
   * Controller to get a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.loginUser(req.body);
      return res.status(data.code).json({
        code: data.code,
        data: data.data,
        message: data.message,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public newUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {    
      const data = await this.UserService.newUser(req.body);

      
      return res.status(data.code).json({
        code: data.code,
        message: data.message
      });
    } catch (error) {
      next(error);
    }
      
  };
  
}

export default UserController;
