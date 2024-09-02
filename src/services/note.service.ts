import  Note  from '../models/note.model'; // Import Note model
import HttpStatus from 'http-status-codes';

export class NoteService {
  // Create a new note
  public async createNote(noteDetails: { Title: string; Description: string; color?: string }) {
    const newNote = new Note(noteDetails);
    const savedNote = await newNote.save();
    
    return {
      code: HttpStatus.CREATED,
      data: savedNote,
      message: 'Note created successfully',
    };
  }

  // Get all notes
  public async getAllNotes() {
    const notes = await Note.find();
    
    return {
      code: HttpStatus.OK,
      data: notes,
      message: 'Notes retrieved successfully',
    };
  }

  // Get a single note by ID
  public async getNoteById(noteId: string,createdby:string) {
    const note = await Note.findOne({_id:noteId,createdby});

    if (!note) {
      return {
        code: HttpStatus.NOT_FOUND,
        data: [],
        message: 'Note not found',
      };
    }

    return {
      code: HttpStatus.OK,
      data: {
        Title : note.Title,
        Description :note.Description,
        color: note.color,
        createdby:note.createdby
      },
      message: 'Note retrieved successfully',
    };
  }

  // Update a note by ID
  public async updateNote(noteId: string,createdby:string, noteDetails: { title?: string; description?: string; color?: string }) {
    const updatedNote = await Note.findOneAndUpdate({_id:noteId,createdby}, noteDetails, { new: true });

    if (!updatedNote) {
      return {
        code: HttpStatus.NOT_FOUND,
        data: [],
        message: 'Note not found',
      };
    }
 
    await Note.updateOne({_id:noteId,createdby});

    return {
      code: HttpStatus.OK,
      data: updatedNote,
      message: 'Note updated successfully',
    };
  }

  // Delete a note by ID
  public async deleteNote(noteId: string,createdby:string) {
    const deletedNote = await Note.findOne({_id:noteId,createdby});
    if (!deletedNote) {
      return {
        code: HttpStatus.NOT_FOUND,
        data: [],
        message: 'Note not found',
      };
    }

    await Note.deleteOne({_id:noteId,createdby})

    return {
      code: HttpStatus.OK,
      data: deletedNote,
      message: 'Note deleted successfully',
    };
  }
}

export default NoteService;
