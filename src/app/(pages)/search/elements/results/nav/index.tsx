import { Element } from "./elements";
import { IconChevronLeftPipe, IconChevronRightPipe } from "@tabler/icons-react";
import { LowDetailNote, LowDetailUser, Page } from "@/core";

interface NavProps extends React.HTMLAttributes<HTMLElement> {
    page: Omit<Page<(LowDetailUser | LowDetailNote)>, "content">;
    isEmpty: boolean;
}

export const Nav = ({ page, isEmpty, ...rest }: NavProps) => {

    const { first, last, page: index, totalPages } = page;
    const current = index + 1;

    if ((first || last) && isEmpty) return null;

    const { Pagination, Pageable } = Element;

    return (
        <Pagination {...rest}>

            {!first && !(current - 1 === 1) &&
                <Pageable aria-label="Primeira página" sParam="page" page={1}>
                    <IconChevronLeftPipe size={18} />
                </Pageable>
            }

            {current > 1 && current <= totalPages &&
                <Pageable aria-label="Voltar página" sParam="page" page={current - 1} />
            }

            {current <= totalPages &&
                <Pageable sParam="page" page={current} />
            }

            {current < totalPages &&
                <Pageable aria-label="Próxima página" sParam="page" page={current + 1} />
            }

            {!last && !(current + 1 === totalPages) &&
                <Pageable aria-label="Última página" sParam="page" page={totalPages}>
                    <IconChevronRightPipe size={18} />
                </Pageable>
            }

        </Pagination>
    )

}