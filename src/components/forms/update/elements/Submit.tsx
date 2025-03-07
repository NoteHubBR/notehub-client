import { forwardRef } from "react";

export const Submit = forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(({ ...props }, ref) => (
    <button
        ref={ref}
        type="submit"
        className="py-2 px-4 rounded-full
        font-medium text-sm
        dark:text-black text-white
        dark:bg-white bg-black
        hover:opacity-75 transition-opacity"
        {...props}
    />
))

Submit.displayName = 'Submit';