import { Note } from './Note';

export interface NoteSecret {
    id: Note['id'];
    passphrase: string;
    plaintext: string;
    cipher: string;
}