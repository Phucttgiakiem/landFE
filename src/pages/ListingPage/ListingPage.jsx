import React from 'react';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import { CardComponent } from '../../components/CardComponent/CardComponent';
import { Pagination } from 'antd';
import {Listpanel} from "./style";

const ListingPage = () => {
     const onChange = (page) => {
    
    }
    return (
        <div style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <SearchComponent/>
            <FilterComponent/>
            <Listpanel>
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
            </Listpanel>
        </div>
    )
}
export default ListingPage;