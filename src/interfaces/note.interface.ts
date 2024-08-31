import { required } from '@hapi/joi';
import { Schema, model } from 'mongoose';
// import {INote} from '../interfaces/note.interface';

const noteSchema = new Schema(
    {
        Title: {
            type:String,
            required:true,
        },
        Description: {
            type:String,
            required:true,
        },
        color: {
            type:String
        }
    },
    {
        timestamps: true
      }
);

export default model('Note',noteSchema);