import { EncryptionFieldset } from './Fieldset.Encryption';
import { FileFieldset } from './Fieldset.File';

const FieldsetRoot = ({ className, ...rest }: React.FieldsetHTMLAttributes<HTMLFieldSetElement>) => (
    <fieldset className={className} {...rest} />
)

export const Fieldset = Object.assign(FieldsetRoot, {
    Encryption: EncryptionFieldset,
    File: FileFieldset,
})