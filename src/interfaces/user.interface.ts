
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string; 
  email:string;
  password:string;
  // confirmpassword?:string

}

const UserSchema: Schema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }

});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
