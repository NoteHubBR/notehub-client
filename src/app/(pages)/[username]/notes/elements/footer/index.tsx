import { Element } from "./elements";
import { IconChevronLeftPipe, IconChevronRightPipe } from "@tabler/icons-react";
import { LowDetailNote, Page } from "@/core";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
    page: Omit<Page<LowDetailNote>, "content">;
    isEmpty: boolean;
}

export { Skeleton as footer } from "./skeleton";

export const Footer = ({ page, isEmpty, ...rest }: FooterProps) => {

    const { first, last, page: index, totalPages } = page;
    const current = index + 1;

    if ((first || last) && isEmpty) return null;

    return (
        <footer {...rest}>
            <Element.Pagination>

                {!first && !(current - 1 === 1) &&
                    <Element.Pageable aria-label="Primeira página" sParam="page" page={1}>
                        <IconChevronLeftPipe size={18} />
                    </Element.Pageable>
                }

                {current > 1 && current <= totalPages &&
                    <Element.Pageable aria-label="Voltar página" sParam="page" page={current - 1} />
                }

                {current <= totalPages &&
                    <Element.Pageable sParam="page" page={current} />
                }

                {current < totalPages &&
                    <Element.Pageable aria-label="Próxima página" sParam="page" page={current + 1} />
                }

                {!last && !(current + 1 === totalPages) &&
                    <Element.Pageable aria-label="Última página" sParam="page" page={totalPages}>
                        <IconChevronRightPipe size={18} />
                    </Element.Pageable>
                }

            </Element.Pagination>
        </footer >
    )

}