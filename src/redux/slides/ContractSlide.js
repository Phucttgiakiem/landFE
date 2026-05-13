import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    contract: [],
    page: 1,
    limit: 2,
    total: 0,
    totalPage: 0,

    sort: {
        field: null,
        order: null,
    },
    filter: {},
    isLoading: false,
    error: null
}
export const ContractSlide = createSlice({
    name: "contract",
    initialState,
    reducers: {
        setContract: (state,action) => {
            state.contract = action.payload.data
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
            state.sort.field = action.payload.field
            state.sort.order = action.payload.order
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        resetFilter: (state) => {
            state.filter = {};
        },
        resetSort: (state) => {
            state.sort = initialState.sort
        },
    }
})
export const { 
    setContract, 
    setPage,
    setLimit,
    setSort,
    setFilter,
    resetFilter,
    resetSort
} = ContractSlide.actions

export default ContractSlide.reducer