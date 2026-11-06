import { clsx } from 'clsx';
import { CreateNoteFormData } from '@/core';
import { Error } from './Error';
import { IconKey, IconWorld } from '@tabler/icons-react';
import { Input } from './Input';
import { Label } from './Label';
import { Legend } from './Legend';
import { useWatch } from 'react-hook-form';

export const EncryptionFieldset = (props: React.FieldsetHTMLAttributes<HTMLFieldSetElement>) => {

    const needsEncryption = useWatch<CreateNoteFormData>({ name: 'encrypted' }) === 'true';

    return (
        <>
            <fieldset
                {...props}
                className='p-2 pb-4 rounded-md border dark:border-middark border-midlight'
            >
                <Legend tip='(opcional)'>Criptografia</Legend>
                <Input.Radio id='encryptedFalse' name='encrypted' value='false' defaultChecked />
                <Label htmlFor='encryptedFalse' icon={IconWorld} className='cursor-pointer mr-3'>Não</Label>
                <Input.Radio id='encryptedTrue' name='encrypted' value='true' />
                <Label htmlFor='encryptedTrue' icon={IconKey} className='cursor-pointer'>Sim</Label>
            </fieldset>
            <fieldset
                className={clsx(
                    'relative overflow-hidden',
                    '-mt-1 pl-6 ',
                    'border-l dark:border-middark border-midlight',
                    'origin-top-left transition-transform',
                    needsEncryption
                        ? 'scale-100 h-fit'
                        : 'scale-0 h-0',
                )}
            >
                <Label htmlFor='passphrase' tip='*' className='block'>Segredo</Label>
                <Input.Password name='passphrase' enabled={needsEncryption} className='my-1' />
                <Error field='passphrase' />
            </fieldset>
        </>
    )

}