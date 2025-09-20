import React from 'react';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import { CardComponent } from '../../components/CardComponent/CardComponent';
const HomePage = () => {
    return (
        <div style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <SearchComponent/>
            <FilterComponent/>
            <div style={{width:"100%",maxWidth:"calc(100% - 280px)",height:"max-content",margin:"12rem auto 0"}}>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
            </div>
        </div>
    )
}
export default HomePage;