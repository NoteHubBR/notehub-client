import { ApiError } from '@/api';
import { CreateNoteFormData, createNoteFormSchema, createNoteFormSchemaRefined, handleFieldErrors } from '@/core';
import { Element } from './elements';
import { FormProvider, useForm } from 'react-hook-form';
import { IconEyeClosed, IconMessage, IconMessageOff, IconWorld } from '@tabler/icons-react';
import { useApi, useCrypto, useNotes } from '@/data/hooks';
import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

export const Form = ({ token, username }: { token: string; username: string; }) => {

    const {
        noteService: { createNote },
        withProgress
    } = useApi();
    const qc = useQueryClient();

    const { notes, setNewNote } = useNotes();

    const schema = useMemo(() =>
        createNoteFormSchema(username, (notes ?? []).map((n) => n.name)),
        [username, notes]
    )

    const refinedSchema = useMemo(() =>
        createNoteFormSchemaRefined(username, (notes ?? []).map((n) => n.name)),
        [username, notes]
    )

    const createNoteForm = useForm<CreateNoteFormData>({
        resolver: zodResolver(refinedSchema),
        mode: 'onChange',
    })

    const { handleSubmit, setError } = createNoteForm;

    const { isCrypting, encrypt } = useCrypto();
    const [isPending, setIsPending] = useState<boolean>(false);
    const busy = isPending || isCrypting;

    const router = useRouter();

    const onSubmit = async (data: CreateNoteFormData): Promise<void> => {
        try {
            setIsPending(true);
            const { passphrase, ...rest } = data;
            const payload = rest.encrypted
                ? { ...rest, markdown: await encrypt(rest.markdown ?? '', passphrase!) }
                : rest;
            const note = await withProgress(() => createNote(token, payload));
            await Promise.all([
                qc.invalidateQueries({ queryKey: ['userNotes', token, username] }),
                qc.invalidateQueries({ queryKey: ['userTags', token, username] }),
                qc.invalidateQueries({ queryKey: ['searchNotes'] }),
                qc.invalidateQueries({ queryKey: ['searchTags'] })
            ])
            setNewNote(note);
            router.push(`/${username}/${note.name}`);
        } catch (error) {
            const { data } = error as ApiError;
            if (Array.isArray(data)) handleFieldErrors(data, setError);
        } finally {
            setIsPending(false);
        }
    }

    const { Section, Fieldset, EncryptionFieldset, FileFieldset, Legend, Label, Owner, InputPassword, InputText, InputRadio, Error, Info, Submit } = Element;

    return (
        <FormProvider {...createNoteForm}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full h-full flex-1 flex flex-col'
            >
                <Section>
                    <h2 className='text-sm dark:text-midlight/65 text-middark/65'>
                        Campos obrigatórios estão marcados com *
                    </h2>
                </Section>
                <Section className='gap-3'>
                    <Fieldset className='relative'>
                        <Label htmlFor='name' tip='*' className='block'>Título</Label>
                        <div className='my-2 flex insm:flex-col items-center insm:items-start gap-2'>
                            <Owner aria-hidden='true' />
                            <InputText schema={schema} autoFocus name='name' />
                        </div>
                        <Error field='name' />
                    </Fieldset>
                    <Fieldset className='relative'>
                        <Label htmlFor='description' tip='(opcional)' className='block'>Descrição</Label>
                        <InputText schema={schema} name='description' className='my-1' />
                        <Error field='description' />
                    </Fieldset>
                </Section>
                <Section className='gap-3'>
                    <EncryptionFieldset />
                    <Fieldset className='p-2 pb-4 rounded-md border dark:border-middark border-midlight'>
                        <Legend tip='*'>Visiblidade</Legend>
                        <InputRadio id='hiddenFalse' name='hidden' value='false' defaultChecked />
                        <Label htmlFor='hiddenFalse' icon={IconWorld} className='cursor-pointer mr-3'>Pública</Label>
                        <InputRadio id='hiddenTrue' name='hidden' value='true' />
                        <Label htmlFor='hiddenTrue' icon={IconEyeClosed} className='cursor-pointer'>Oculta</Label>
                    </Fieldset>
                    <Fieldset className='p-2 pb-4 rounded-md border dark:border-middark border-midlight'>
                        <Legend tip='*'>Comentários</Legend>
                        <InputRadio id='closedFalse' name='closed' value='false' defaultChecked />
                        <Label htmlFor='closedFalse' icon={IconMessage} className='cursor-pointer mr-3'>Abertos</Label>
                        <InputRadio id='closedTrue' name='closed' value='true' />
                        <Label htmlFor='closedTrue' icon={IconMessageOff} className='cursor-pointer'>Fechados</Label>
                    </Fieldset>
                </Section>
                <Section>
                    <FileFieldset name='markdown'>
                        <Legend tip='(opcional)'>Carregar nota</Legend>
                    </FileFieldset>
                </Section>
                <Section className='flex-1'>
                    <Info />
                    <Submit disabled={busy}>
                        {isCrypting
                            ? 'Criptografando…'
                            : isPending
                                ? 'Criando…'
                                : 'Criar nota'
                        }
                    </Submit>
                </Section>
            </form>
        </FormProvider>
    )

}