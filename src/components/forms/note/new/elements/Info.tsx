import { CreateNoteFormData } from '@/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useWatch } from 'react-hook-form';

export const Info = (props: React.HTMLAttributes<HTMLHeadingElement>) => {

    const isHidden = useWatch<CreateNoteFormData>({ name: 'hidden' }) === 'true';
    const isEncrypted = useWatch<CreateNoteFormData>({ name: 'encrypted' }) === 'true';

    return (
        <h3
            {...props}
            className='flex items-center gap-1 text-sm dark:text-midlight/65 text-middark/65'
        >
            <IconInfoCircle className='flex-none inmd:self-start' />
            Você está criando uma nota{' '}
            {isHidden ? 'privada' : 'pública'}{' '}
            {isEncrypted ? 'criptografada' : 'sem criptografia'}.
        </h3>
    )

}