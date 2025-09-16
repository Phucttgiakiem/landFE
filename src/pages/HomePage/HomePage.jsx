import React from 'react';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
const HomePage = () => {
    return (
        <div style={{"position":"relative"}}>
            <SearchComponent/>
            <FilterComponent/>
        </div>
    )
}
export default HomePage;