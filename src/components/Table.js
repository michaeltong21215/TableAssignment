import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar';
import TablePagination from './TablePagination';

const styles = {
  table: {
    fontFamily: 'arial, sans-serif',
    borderCollapse: 'collapse',
    width: '100%'
  }
};

const Table = ({ renderRow, entries, header, classes, placeholder = '', textfilterOptions = [], pageLimit = 10 }) => {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);

  const doesIncludeEntry = entry => {
    return filter.length > 0 ? textfilterOptions.filter(option => entry[option].toLowerCase().includes(filter.toLowerCase())).length > 0 : true;
  };

  const getPaginatedEntries = entries => {
    const offset = page * pageLimit;
    return entries.slice(offset, offset + pageLimit);
  }

  const getFilteredEntries = () => {
    return entries.filter(entry => doesIncludeEntry(entry));
  }

  const renderEntries = () => {
    return getPaginatedEntries(getFilteredEntries());
  }

  return (
    <div>
      <SearchBar 
        setValue={setFilter}
        placeholder={placeholder}
      />
      <table className={classes.table}>
        {header}
        {renderEntries().map(entry => renderRow(entry))}
      </table>
      <TablePagination 
        pageLimit={pageLimit}
        pages={getFilteredEntries().length}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  )
}

export default withStyles(styles)(Table);