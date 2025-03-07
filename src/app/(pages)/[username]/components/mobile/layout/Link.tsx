// Futuramente será aplicada a técnica "Client-Side Routing" ou "Modal Routing", este é o motivo do componente se chamar Link
// import { forwardRef } from 'react';
// import NextLink, { LinkProps as NextLinkProps } from 'next/link';

// interface LinkProps extends NextLinkProps {
//     children: React.ReactNode;
// }

// export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ children, ...rest }, ref) => {
//     return (
//         <NextLink
//             ref={ref}
//             aria-label="Editar"
//             className="p-2 rounded-full
//             dark:text-white text-black
//             dark:bg-black bg-white
//             drop-shadow-[0_0_1px_rgba(0,0,0,0.33)]"
//             {...rest}
//         >
//             {children}
//         </NextLink>
//     )
// })
// Link.displayName = 'Link';

import { forwardRef } from "react";

interface LinkProps {
    children: React.ReactNode;
}

export const Link = forwardRef<HTMLButtonElement, LinkProps>(({ children, ...rest }, ref) => {
    return (
        <button
            ref={ref}
            aria-label="Editar"
            className="p-2 rounded-full
            dark:text-white text-black
            dark:bg-black bg-white
            drop-shadow-[0_0_1px_rgba(0,0,0,0.33)]"
            {...rest}
        >
            {children}
        </button>
    )
})
Link.displayName = 'Link';