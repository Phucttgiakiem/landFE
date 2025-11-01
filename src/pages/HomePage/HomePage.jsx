import React from 'react';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import { CardComponent } from '../../components/CardComponent/CardComponent';
import { Pagination } from 'antd';
const HomePage = () => {
    const onChange = (page) => {

    }
    return (
        <div style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <SearchComponent/>
            <FilterComponent/>
            <div style={{width:"100%",maxWidth:"calc(100% - 280px)",height:"max-content",margin:"12rem auto 0"}}>
                <div>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                </div>
                <Pagination defaultCurrent={2} total={100} onChange={onChange} align="center" style={{margin:"3rem 0"}}/>
            </div>
        </div>
    )
}
export default HomePage;