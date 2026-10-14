import { createNoteFormSchema, CreateNoteFormSchema, CreateNoteFormData } from './CreateNote';
import { createNoteUpdateFormSchema, NoteUpdateFormSchema, NoteUpdateFormData } from './UpdateNote';
import { noteTextUpdateFormSchema, NoteTextUpdateFormData } from './UpdateNoteText';

export type {
    CreateNoteFormSchema, CreateNoteFormData,
    NoteUpdateFormSchema, NoteUpdateFormData,
    NoteTextUpdateFormData,
}

export {
    createNoteFormSchema,
    createNoteUpdateFormSchema,
    noteTextUpdateFormSchema,
}