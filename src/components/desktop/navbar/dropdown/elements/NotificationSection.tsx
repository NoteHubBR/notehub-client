import { forwardRef } from "react";

export const Section = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLUListElement>>(({ ...props }, ref) => (
    <section
        ref={ref}
        className="scrollbar
            cursor-auto
            w-[400px] max-h-[400px] overflow-y-auto
            pt-2
            border-t dark:border-t-neutral-50/20 border-t-neutral-900/20
            first:pt-0 pb-2 first:dark:border-t-transparent first:border-t-transparent"
    >
        <ul className="flex flex-col gap-2" {...props} />
    </section>
))

Section.displayName = 'Section';