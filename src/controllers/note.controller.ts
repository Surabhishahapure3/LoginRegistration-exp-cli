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
    try {
      const data = await this.noteService.createNote(req.body);
      return res.status(HttpStatus.CREATED).json({
        code: data.code,
        data : data.data,
        message: data.message
      })
    } catch (error) {
      next(error);
    }
  };

  public getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.noteService.getAllNotes();
      return res.status(HttpStatus.OK).json({
        code: data.code,
        data : data.data,
        message: data.message
      })
    } catch (error) {
      next(error);
    }
  };


  public getNoteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.noteService.getNoteById(req.params.noteId);
      return res.status(data.code).json({
        code: data.code,
        data : data.data,
        message: data.message
      })
    } catch (error) {
      next(error);
    }
  };


  public updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.noteService.updateNote(req.params.noteId, req.body);
      return res.status(data.code).json({
        code: data.code,
        data : data.data,
        message: data.message
      })
    } catch (error) {
      next(error);
    }
  };

  public deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.noteService.deleteNote(req.params.noteId);
      return res.status(data.code).json({
        code: data.code,
        data : data.data,
        message: data.message
      })
    } catch (error) {
      next(error);
    }
  };
}


export default NoteController;