
import { Fragment, useEffect, useState } from "react";
import "./Pagination.css"

function Pagination({ data, RenderComponent, RenderComponentWrapper, title, pageLimit, dataLimit, onCurrentPageChange }) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
    onCurrentPageChange(currentPage);
  }, [currentPage,onCurrentPageChange]);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  //the logic behind this is that the items are fetch by page from the api so it always will be from 0-20, 
  //items are not pushed to context cause this app is demonstration purposes only
  const getPaginatedData = () => {
    // const startIndex = currentPage * dataLimit - dataLimit;
    // const endIndex = startIndex + dataLimit;
    return data.slice(0, 20);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <Fragment>
      {/* show the movies, 20 posts at a time */}
      <Fragment >
        <RenderComponentWrapper data={data}>
          {getPaginatedData().map((d, idx) => (
            <RenderComponent
              key={idx} data={d}
              id={data[idx].id}
              title={data[idx].title}
              image={data[idx].image}
              poster={data[idx].poster}
              releaseDate={data[idx].releaseDate}
              popularity={data[idx].popularity}
              identifier={idx} />
          ))}
        </RenderComponentWrapper>

      </Fragment>

      {/* show the pagiantion
              it consists of next and previous buttons
              along with page numbers, in our case, 5 page
              numbers at a time
          */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          prev
        </button>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? 'active' : null}`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
          next
        </button>
      </div>
    </Fragment>
  );
}


export default Pagination;