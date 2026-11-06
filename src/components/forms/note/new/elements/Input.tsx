import { InputPassword } from './Input.Password';
import { InputRadio } from './Input.Radio';
import { InputText } from './Input.Text';

const InputRoot = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} />
)

export const Input = Object.assign(InputRoot, {
    Password: InputPassword,
    Radio: InputRadio,
    Text: InputText,
})