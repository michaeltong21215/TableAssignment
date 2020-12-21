import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';

const styles = {
  main: {
    border: '1px solid #dddddd',
    textAlign: 'right',
    padding: 8,
    paddingLeft: 0
  },
  page: {
    border: '1px solid #dddddd',
    padding: 8,
    cursor: 'pointer'
  }
};

const TablePagination = ({ currentPage, pages, setPage, pageLimit, classes }) => {
  const numPages = Math.ceil(pages / pageLimit);

  const getPaginationNumbers = () => {
    const blocks = [];
    for (let i = 0; i < numPages; i++) {
      blocks.push(i);
    }
    return blocks;
  };
  
  const renderPageBlocks = () => {
    const getPageNumbers = getPaginationNumbers();
    return getPageNumbers.map(pageNum =>
      <a 
        key={pageNum} 
        className={classes.page} 
        onClick={() => setPage(pageNum)}
        style={pageNum === currentPage ? { backgroundColor: 'lightBlue' } : null}
      >
        {pageNum}
      </a>
    );
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages - 1) {
      setPage(currentPage + 1);
    }
  };

  const renderPrevPageBlocks = () => {
    return (
      <Fragment>
        <a key="first-page" className={classes.page} onClick={() => setPage(0)}>&#171;</a>
        <a key="prev-page" className={classes.page} onClick={goToPrevPage}>&#8592;</a>
      </Fragment>
    )
  };

  const renderNextPageBlocks = () => {
    return (
      <Fragment>
        <a key="next-page" className={classes.page} onClick={goToNextPage}>&rarr;</a>
        <a key="last-page" className={classes.page} onClick={() => setPage(numPages - 1)}>&raquo;</a>
      </Fragment>
    )
  };

  return (
    <div className={classes.main}>
      {renderPrevPageBlocks()}
      {renderPageBlocks()}
      {renderNextPageBlocks()}
    </div>
  );
}

export default withStyles(styles)(TablePagination);