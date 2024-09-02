import { Router } from 'express';
import { NoteController } from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = Router();
const noteController = new NoteController();

// Create a new note
router.post('/add', userAuth, noteController.createNote);

// Get all notes
router.get('/all', userAuth, noteController.getAllNotes);

// Get a note by ID
router.get('/:noteId/:createdby', userAuth, noteController.getNoteById);

// Update a note by ID
router.put('/:noteId/:createdy', userAuth, noteController.updateNote);

// Delete a note by ID
router.delete('/:noteId/:createdby', userAuth, noteController.deleteNote);

export default router;
