import React, { useEffect } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    useEffect(() => {
    }, []);

    const maxPageNumbersToShow = 5;

    const getPageNumbers = () => {
        const pageNumbers = [];
        const halfPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

        let startPage = Math.max(currentPage - halfPageNumbersToShow, 1);
        let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

        if (endPage - startPage < maxPageNumbersToShow - 1) {
            startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    return (
        <div className="flex flex-col items-center bg-white pb-10">
            <div className="flex justify-center mb-2">
                <button
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 font-semibold text-sm rounded-[7px] mr-2"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor" 
                        className="w-4 h-4 text-yellow-500"
                    >
                        <path 
                            fillRule="evenodd" 
                            d="M10 18a1 1 0 01-.707-.293l-7-7a1 1 0 010-1.414l7-7a1 1 0 111.414 1.414L5.414 9H18a1 1 0 110 2H5.414l5.293 5.293A1 1 0 0110 18z" 
                            clipRule="evenodd" 
                        />
                    </svg>
                </button>
                {getPageNumbers().map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={`border border-1 px-3 mx-1 py-1 font-semibold text-sm rounded-[7px] ${currentPage === pageNumber ? 'bg-yellow-400 text-white' : ''}`}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 font-semibold text-sm rounded-[7px] ml-2"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor" 
                        className="w-4 h-4 text-yellow-500"
                    >
                        <path 
                            fillRule="evenodd" 
                            d="M10 2a1 1 0 01.707.293l7 7a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414L14.586 10H2a1 1 0 110-2h12.586l-5.293-5.293A1 1 0 0110 2z" 
                            clipRule="evenodd" 
                        />
                    </svg>
                </button>
            </div>
            <div className="text-xs text-gray-600">
                Page {currentPage} of {totalPages}
            </div>
        </div>
    );
};

export default Pagination;
