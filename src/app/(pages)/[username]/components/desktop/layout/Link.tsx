// Futuramente será aplicada a técnica "Client-Side Routing" ou "Modal Routing", este é o motivo do componente se chamar Link

// import { forwardRef } from "react";
// import NextLink, { LinkProps } from "next/link";

// export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ ...props }, ref) => (
//     <NextLink
//         ref={ref}
//         className="w-28 inlg:w-24 py-2 flex items-center justify-center
//         rounded-3xl
//         text-md inlg:text-sm font-medium
//         dark:bg-white bg-black
//         dark:text-black text-white
//         hover:opacity-65
//         transition-all duration-150"
//         {...props}
//     >
//         Perfil
//     </NextLink>
// ))

// Link.displayName = 'Link';

import { forwardRef } from "react";

export const Link = forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(({ ...props }, ref) => (
    <button
        ref={ref}
        className="w-28 inlg:w-24 py-2 flex items-center justify-center
        rounded-3xl
        text-md inlg:text-sm font-medium
        dark:bg-white bg-black
        dark:text-black text-white
        hover:opacity-65
        transition-all duration-150"
        {...props}
    />
))

Link.displayName = 'Link';