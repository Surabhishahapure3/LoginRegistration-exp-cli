import jwt from 'jsonwebtoken';
import User from '../models/user.model';   //export default model<IUser>('User', userSchema);
import { IUser } from '../interfaces/user.interface';
import HttpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
class UserService {
  public async loginUser(userdetails: {email:string; password:string}) {
    const email = userdetails.email.toLowerCase();
  
  const user = await User.findOne({
    email: { $regex: new RegExp(`^${email}$`, 'i') }, 
  });
    if(!user)
    {
      return{
        code : HttpStatus.NOT_FOUND,
        data : [],
        message : "user not found"
      }
    }

    const lowercase = userdetails.password.toLowerCase();
    let checkpassword = await bcrypt.compare(lowercase,user.password);
    

    if(!checkpassword)
    {
      return{
        code : HttpStatus.UNAUTHORIZED,
        data : [],
        message : "Invalid email or password"
      }
    }

    const token = jwt.sign(
      {email:user.email, id:user._id},
      process.env.JWT_SECRET,
      { expiresIn: '1h'}
    );
  let fstname = user.firstname;
  let eml = user.email;
    return{
      code : HttpStatus.OK,
      data : {fstname,eml,token},
      message:"User authentication successfully"
    }
  }
  
  public newUser = async (userdetails: {firstname:string;lastname:string;email:string;password:string}): Promise<any> => {

    const email = userdetails.email.toLowerCase();
    const existingUser = await User.findOne({email})
    if(existingUser)
    {
      return{
        code:HttpStatus.CONFLICT,
        data:[],
        message:"User already exists"
      }
    }
    const salt = 10
    let r = userdetails.password.toLowerCase();
    const hashedpassword = await bcrypt.hash(r,salt);
    const user = new User({
      ...userdetails,
      password: hashedpassword, 
    });
    const savedUser = await user.save();
    // return savedUser;
    return {
      code: HttpStatus.CREATED,
      data: savedUser,
      message: 'User created successfully',
    };
  }; 
}

export default UserService;
