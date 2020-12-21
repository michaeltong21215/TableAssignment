import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getRestaurants } from '../apis/restaurants';
import Table from '../components/Table';
import { STATES_ABBR } from '../utils/constants';

const styles = {
  contentSection: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: 8
  },
  headerSection: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: 8
  }
}

const MainPage = ({ classes }) => {
 
  const [restaurants, setRestaurants] = useState([]);
  const [getFilteredRestaurants, setFilteredRestaurants] = useState([]);
  const [genreFilter, setGenreFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');

  useEffect(() => {
    getRestaurants().then(data => {
      const sortData = data.sort((a, b) => (a.name > b.name) ? 1 : -1)
      setRestaurants(sortData);
      setFilteredRestaurants(sortData);
    });
  }, []);

  useEffect(() => {
    let filteredRestaurants = filterDataByGenre(restaurants);
    filteredRestaurants = filterDataByState(filteredRestaurants);
    setFilteredRestaurants(filteredRestaurants);
  }, [genreFilter, stateFilter]);

  const filterDataByGenre = data => {
    if (genreFilter !== 'all') {
      return data.filter(row => row.genre.includes(genreFilter));
    }
    return data;
  }

  const filterDataByState = data => {
    if (stateFilter !== 'all') {
      return data.filter(row => row.state.includes(stateFilter));
    }
    return data;
  }

  const headerOptions = [
    {
      id: "name"
    },
    {
      id: "city"
    },
    {
      id: "state",
      filterOptions: () => renderDropdown(stateFilter, e => setStateFilter(e.target.value), renderStateOptions())
    },
    {
      id: "telephone"
    },
    {
      id: "genre",
      filterOptions: () => renderDropdown(genreFilter, e => setGenreFilter(e.target.value), renderGenreOptions())
    }];

  const renderStateOptions = () => ['all', ...STATES_ABBR];

  const renderGenreOptions = () => {
    return restaurants.reduce((acc, val) => {
      const genres = val.genre.split(',');
      return Array.from(new Set([...acc, ...genres]));
    }, ['all'])
  };

  const renderDropdown = (currentVal, changeFunc, options) => {
    return (
      <select value={currentVal} onChange={changeFunc}>
        {options.map(option => <option value={option}>{option}</option>)}
      </select>
    )
  };


  const generateRow = row => {
    return (
      <tr key={row.id}>
        {headerOptions.map(field => (
          <td className={classes.contentSection}>
            {row[field.id]}
          </td>
        ))}
      </tr>
    )
  };

  const header = (
    <tr>
      {headerOptions.map(header => (
        <th className={classes.headerSection}>
          {header.id}
          {header.filterOptions && (
            <div>
              {header.filterOptions()}
            </div>
          )}
        </th>
      ))}
    </tr>
  );

  return (
    <div>
      <Table
        renderRow={row => generateRow(row)}
        entries={getFilteredRestaurants}
        header={header}
        placeholder="Search by name, city, genre"
        textfilterOptions={['name', 'city', 'genre']}
        pageLimit={10}
      />
    </div>
  )
}

export default withStyles(styles)(MainPage);