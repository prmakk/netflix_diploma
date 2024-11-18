import { FC } from "react";
import { scroller } from "react-scroll";

import styles from "./Pagination.module.scss";

interface IPagination {
    onPageChange: (page: number) => void;
    currentPage: number;
    scrollTo: string;
}

const Pagination: FC<IPagination> = ({
    onPageChange,
    currentPage,
    scrollTo,
}) => {
    const totalPages = 50;

    const getDisplayedPages = () => {
        const visiblePages = 5;
        const half = Math.floor(visiblePages / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        if (currentPage <= half) {
            end = Math.min(totalPages, visiblePages);
        } else if (currentPage + half >= totalPages) {
            start = Math.max(1, totalPages - visiblePages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const displayedPages = getDisplayedPages();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(+e.currentTarget.value);
        scroller.scrollTo(scrollTo, {
            smooth: true,
            duration: 1000,
        });
    };

    return (
        <div className={styles.pagination}>
            {displayedPages.map((page) => (
                <button
                    key={page}
                    value={page}
                    onClick={handleClick}
                    className={page === currentPage ? styles.active : undefined}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
