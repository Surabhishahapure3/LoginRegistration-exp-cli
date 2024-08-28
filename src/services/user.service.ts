import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import HttpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
class UserService {

  //get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await User.find();
    return data;
  };

  public getUserByEmail = async(email:string):Promise<IUser | null> => {
    return User.findOne({email});
  }

  public async findUserByEmail(userdetails: { email: string; password: string }): Promise<{ code: number; data: any; message: string }> {
    try {
      const user = await User.findOne({ email: userdetails.email });

      if (!user) {
          return {
              code: HttpStatus.NOT_FOUND,
              data: null,
              message: 'User not found'
          };
      }

      const checkPassword = await bcrypt.compare(userdetails.password, user.password);

      if (!checkPassword) {
          return {
              code: HttpStatus.UNAUTHORIZED,
              data: null,
              message: 'Invalid email or password'
          };
      }

      return {
          code: HttpStatus.OK,
          data: user,
          message: 'Login successful'
      };
        
    } catch (error) {
      console.error('Error in findUserByEmail:', error);
      return {
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          data: null,
          message: 'Error retrieving user'
      };
    }
}

  //create new user
  public newUser = async (userdetails: IUser): Promise<{ code: number; data: any; message: string }> => {
    
    try {
      const existingUser = await User.findOne({ email: userdetails.email });
      if (existingUser) {
        return {
            code: HttpStatus.BAD_REQUEST,
            data: null,
            message: 'User with this email already exists'
        };
    }
      const salt = 10
    const hashedpassword = await bcrypt.hash(userdetails.password,salt)
    const user = new User({
      ...userdetails,
      password: hashedpassword, // Storing hashed password
    });
    const savedUser = await user.save();
    return{
      code: HttpStatus.CREATED,
      data: savedUser,
      message: 'User created successfully'
    }
    } catch (error) {
      console.error('Error in newUser:', error);
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
                message: 'Error creating user'
            };
    }
  };
 

  
}

export default UserService;
