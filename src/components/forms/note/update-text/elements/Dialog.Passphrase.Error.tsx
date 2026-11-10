import { UpdateNotePassphraseFormData } from '@/core';
import { useFormContext } from 'react-hook-form';

export const PassphraseError = (props: React.HTMLAttributes<HTMLSpanElement>) => {

    const { formState: { errors } } = useFormContext<UpdateNotePassphraseFormData>();
    const field: keyof UpdateNotePassphraseFormData = 'passphrase'

    const error = errors[field]?.message;

    if (error) return (
        <p
            data-testid={`error-${field}`}
            className='p-2 text-sm font-medium dark:text-red-500 text-red-600'
            {...props}
        >
            {error.toString()}
        </p>
    )

    return null;

}