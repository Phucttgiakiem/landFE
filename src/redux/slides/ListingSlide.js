import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    listings: {
        active: [],
        deleted: [],
    },
    page: 1,
    limit: 2,
    total: 0,
    totalPage: 0,

    sort: {
        field: null,
        order: null,
    },

    filter: {
        keyword:null,
        CityID: null,
        CommuneID: null,
        User: null,
        minPrice: null,
        maxPrice: null,
        CatagoryProperty: null,
        approval_status: null,
        visibility_status: null,
    },
    itemdeleted: 0,
    isLoading: false,
    error: null
}
export const listingSlide = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        setListings: (state, action) => {
            state.listings.active = action.payload.data
            state.total = action.payload.total
            state.totalPage = action.payload.totalPage
        },
        setListingsDeleted: (state, action) => {
            state.listings.deleted = action.payload.data
            state.total = action.payload.total
            state.totalPage = action.payload.totalPage
        },
        setPage: (state, action) => {
            state.page = action.payload.pageCurrent
        },

        setLimit: (state, action) => {
            state.limit = action.payload
        },

        setSort: (state, action) => {
            state.sort = action.payload
        },

        setFilter: (state, action) => {
            state.filter = {
                ...state.filter,
                ...action.payload
            }
        },
        setFilterClean: (state, action) => {
            state.filter = {
                ...initialState.filter,
                ...action.payload
            };
        },
        resetFilter: (state) => {
            state.filter = initialState.filter
        },
        resetSort: (state) => {
            state.sort = initialState.sort
        },
        setcountdeleted: (state, action) => {
            state.itemdeleted = action.payload
        }
    }
})

export const { 
    setListings, 
    setPage,
    setLimit,
    setSort,
    setFilter,
    resetFilter,
    resetSort,
    setListingsDeleted,
    setcountdeleted,
    setFilterClean
} = listingSlide.actions

export default listingSlide.reducer