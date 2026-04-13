import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    featured : [],
    latest : [],
    cheap: [],
    countnews: [],
    isLoading: false,
    error: null
}
export const homeSlide = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setData: (state, action) => {
            state.featured = action.payload.featured
            state.latest = action.payload.latest
            state.cheap = action.payload.cheap
            let news = action.payload.countnews
            news = news.sort((a,b) => Number(a.CityID) < Number(b.CityID) ? 1 : -1);
            state.countnews = news
            state.isLoading = false
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false
        }
    }
})
export const { setData, setLoading, setError } = homeSlide.actions
export default homeSlide.reducer