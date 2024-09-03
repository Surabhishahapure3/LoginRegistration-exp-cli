import { Request, Response, NextFunction } from 'express';
import { NoteService } from '../services/note.service';
import HttpStatus from 'http-status-codes';

export class NoteController {
  private noteService: NoteService;

  constructor() {
    this.noteService = new NoteService();
  }

/*try {
      const data = await this.UserService.loginUser(req.body);
      return res.status(data.code).json({
        code: data.code,
        data: data.data,
        message: data.message,
      });
    } catch (error) {
      next(error);
    }*/
  public createNote = async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.noteService.createNote(req.body);
    try {
      return res.status(HttpStatus.CREATED).json({
        code: data.code,
        data : data.data,
        message: data.message
      })
    } catch (error) {   
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: data.code,
        message:`${error}`
      })
    }
  };

  public getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.noteService.getAllNotes(res.locals.createdby);
    try {
      return res.status(HttpStatus.OK).json({
        code: data.code,
        data : data.data,
        message: data.message
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: data.code,
        message:`${error}`
      })
    }
  };


  public getNoteById = async (req: Request, res: Response, next: NextFunction) => {
    const noteId = req.params.noteId;
      
      const data = await this.noteService.getNoteById(noteId);
    try {
      console.log('Service Response:', data);

      return res.status(data.code).json({
        code: data.code,
        data : data.data,
        message: data.message
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: data.code,
        message:`${error}`
      })
    }
  };


  public updateNote = async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.noteService.updateNote(req.params.noteId,req.body);
    try {
      return res.status(data.code).json({
        code: data.code,
        data : data.data,
        message: data.message
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: data.code,
        message:`${error}`
      })
    }
  };

  public deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.noteService.deleteNote(req.params.noteId);
    try {
      return res.status(data.code).json({
        code: data.code,
        data : data.data,
        message: data.message
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: data.code,
        message:`${error}`
      })
    }
  };
}


export default NoteController;