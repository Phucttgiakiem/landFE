import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    CategoriItems : [],
    isLoading: false,
    error: null,
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
    }
});
export const {setLoading,setCategories} = CategorySlide.actions;
export default CategorySlide.reducer