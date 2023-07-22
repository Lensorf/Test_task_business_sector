import React from 'react';
import './Pagination.css';
import { Link } from 'react-router-dom';

function Pagination({
  postsPerPage, totalPosts, paginate, currentPage, setCurrentPage, maxPage,
}) {
  const pageNumbers = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => setCurrentPage((prev) => {
    if (currentPage !== maxPage) {
      return prev + 1;
    }
    return prev;
  });

  const prevPage = () => setCurrentPage((prev) => {
    if (currentPage !== 1) {
      return prev - 1;
    }
    return prev;
  });

  return (
    <div className="Pagination">
      <Link className="buttonPagination" to={`/page_${currentPage > 1 ? currentPage - 1 : currentPage}`} type="button" onClick={prevPage}>Назад</Link>
      <div className="paginationNumber">
        {
        pageNumbers.map((number) => (
          <Link key={number} to={`/page_${number}`} type="button" className="page-link" onClick={() => paginate(number)}>
            {number}
          </Link>
        ))
        }
      </div>
      <Link className="buttonPagination" to={`/page_${currentPage < 10 ? currentPage + 1 : currentPage}`} type="button" onClick={nextPage}>Далее</Link>
    </div>
  );
}

export default Pagination;
