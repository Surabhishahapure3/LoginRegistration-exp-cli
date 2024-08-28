/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';

import { Request, Response, NextFunction } from 'express';

class UserController {
  public UserService = new userService();

  /**
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.getAllUsers();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All users fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  

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
      const result = await this.UserService.findUserByEmail(req.body);

        // Check the response code from the service
        if (result.code === HttpStatus.NOT_FOUND || result.code === HttpStatus.UNAUTHORIZED) {
            return res.status(result.code).json({
                code: result.code,
                message: result.message
            });
        }

        res.status(result.code).json({
            code: result.code,
            data: result.data,
            message: result.message
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
      return res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
      
  };
}

export default UserController;
