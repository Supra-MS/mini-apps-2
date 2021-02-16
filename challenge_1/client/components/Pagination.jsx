import React from "React";
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCounter, handlePageChange, currentPage }) => {
    return (
        <ReactPaginate
            previousLabel={'<<'}
            nextLabel={'>>'}
            breakLabel={'...'}
            pageCount={pageCounter}
            forcePage={currentPage -1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            />
    );
};

export default Pagination;

/*
import _ from "lodash"; // underscore

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    const PagesCount = Math.ceil(itemsCount / pageSize); // decimal avoid. pageSize how many pages in pagination
    console.log(PagesCount, 'Pages count');
    console.log(currentPage, 'current Page');
    const pages = _.range(1, PagesCount + 1);
    return (
        <>
            <nav>
                <ul className="pagination">
                    {pages.map(page => {
                        return (
                            <li key={page} className={page === currentPage ? 'page-item active': 'page-item'}>
                                <a className="page-link" onClick={() => {
                                    onPageChange(page)
                                }} href="/#">{page}</a>
                            </li>
                        )
                    })}

                </ul>
            </nav>
        </>
    );
};

*/