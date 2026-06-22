import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    CategoriItems : [],
    isLoading: false,
    error: null,
    ManageCategory : {
        item: [],
        page: 1,
        limit: 4,
        total: 0,
        totalPage: 0,

        sort: {
            field: null,
            order: null,
        },
        filter: {
            Type: null
        },
        isLoading: false,
        error: null
    }
}
export const CategorySlide = createSlice({
    name: 'Category',
    initialState,
    reducers: {
        setLoading: (state,action) => {
            state.isLoading = action.payload
        },
        setCategories: (state,action) => {
            state.CategoriItems = action.payload.data
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setCategorypage: (state,action) => {
            state.ManageCategory.item = action.payload.data;
            state.ManageCategory.total = action.payload.total;
            state.ManageCategory.totalPage = action.payload.totalPage;
        },
        setLoadingManage: (state,action) => {
            state.ManageCategory.isLoading = action.payload
        },
        setErrorManage: (state,action) => {
            state.ManageCategory.error = action.payload
        },
        setPage: (state, action) => {
            state.ManageCategory.page = action.payload.pageCurrent
        },
        setLimit: (state, action) => {
            state.ManageCategory.limit = action.payload
        },

        setSort: (state, action) => {
            state.ManageCategory.sort = action.payload
        },

        setFilter: (state, action) => {
            state.ManageCategory.filter = {
                ...action.payload
            }
        },
        setFilterClean: (state, action) => {
             state.ManageCategory.filter = {
                ...initialState.ManageCategory.filter,
                ...action.payload
            };
        },
        resetFilter: (state) => {
             state.ManageCategory.filter = initialState.ManageCategory.filter
        },
        resetSort: (state) => {
            state.ManageCategory.sort = initialState.ManageCategory.sort
        },
    }
});
export const {setLoading,setCategories,setLoadingManage,setErrorManage,setPage,setLimit,setSort,
    setFilter,setFilterClean,resetFilter,resetSort,setCategorypage
} = CategorySlide.actions;
export default CategorySlide.reducer