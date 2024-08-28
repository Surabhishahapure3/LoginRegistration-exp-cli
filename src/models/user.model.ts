import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { string } from '@hapi/joi';

const userSchema = new Schema(
  {
    firstname: {
      type: String
    },
    lastname:{
      type:String
    },
    email:{
      type:String
    },
    password:{
      type:String
    }
  },
  {
    timestamps: true
  }
);

export default model<IUser>('User', userSchema);
