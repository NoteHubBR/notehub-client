import { Note, NoteSecret } from '../models';
import * as age from 'age-encryption';

export const encrypt = async (plaintext: string, passphrase: string): Promise<string> => {
    const encrypter = new age.Encrypter();
    encrypter.setPassphrase(passphrase);
    const ciphertext = await encrypter.encrypt(plaintext);
    return age.armor.encode(ciphertext);
}

export const decrypt = async (armored: string, passphrase: string): Promise<string> => {
    const decrypter = new age.Decrypter();
    decrypter.addPassphrase(passphrase);
    return decrypter.decrypt(age.armor.decode(armored), 'text');
}

export const planEncryption = async ({ note, secret, plaintext, encrypted, passphrase, encrypt }: {
    note: Note;
    secret: NoteSecret | null;
    plaintext: string;
    encrypted: boolean;
    passphrase?: string;
    encrypt: (plaintext: string, passphrase: string) => Promise<string>;
}): Promise<{ markdown: string | null; nextSecret: NoteSecret | null | undefined }> => {

    const changed = encrypted !== note.encrypted || (encrypted && passphrase !== (secret ? secret.passphrase : null));
    if (!changed) return { markdown: note.markdown, nextSecret: undefined };
    if (!encrypted) return { markdown: plaintext, nextSecret: null };
    const markdown = await encrypt(plaintext, passphrase!);
    return {
        markdown,
        nextSecret: {
            id: note.id,
            passphrase: passphrase!,
            plaintext,
            cipher: markdown
        }
    }

}