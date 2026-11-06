import { InputCheck } from './Input.Check';
import { InputPassword } from './Input.Password';
import { InputTags } from './Input.Tags';
import { InputText } from './Input.Text';

const InputRoot = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} />
)

export const Input = Object.assign(InputRoot, {
    Check: InputCheck,
    Password: InputPassword,
    Tags: InputTags,
    Text: InputText,
})