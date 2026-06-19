import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    entities: {},
    featured : [],
    latest : [],
    cheap: [],
    countnews: [],
    related: {
        items: [],
        isLoading:false,
        page: 1,
        limit: 6,
        total: 0,
        totalPage: 0,
    },
    filtered: {
        items: [],
        isLoading:false,
        page: 1,
        limit: 6,
        total: 0,
        totalPage: 0,
    },
    loading: {
        featured: false,
        latest: false,
        cheap: false,
        countnews: false,
        detail:false
    },
    error: null
}
export const homeSlide = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setLoading: (state, action) => {
             Object.assign(state.loading, action.payload)
        },   
        setEntities: (state, action) => {
            action.payload.forEach(item => {
                state.entities[item._id] = {
                    ...state.entities[item._id],
                    ...item
                }
            })
        },
        setData: (state, action) => {
            const {featured,latest, cheap, countnews} = action.payload;
            const save = (arr) => {
                arr.forEach(item => {
                    state.entities[item._id] = item
                })
            }
            save(featured)
            save(latest)
            save(cheap)
            const sortls = [...countnews].sort((a, b) => Number(b.CityID) - Number(a.CityID));
            state.countnews = sortls;
            state.featured = featured.map(i => i._id);
            state.latest = latest.map(i => i._id);
            state.cheap = cheap.map(i => i._id);
        },
        setRelated: (state, action) => {
            const {data,total,totalPage,pageCurrent} = action.payload;
            state.related.items = data;
            state.related.total = total
            state.related.totalPage = totalPage
            state.related.page = pageCurrent
        },
        setFiltered: (state,action) => {
            const {data,total,totalPage,pageCurrent} = action.payload;

            state.filtered.items = data;
            state.filtered.total = total
            state.filtered.totalPage = totalPage
            state.filtered.page = pageCurrent
        },
        setLoadingRelated: (state,action) => {
            state.related.isLoading = action.payload
        },
        setLoadingFiltered: (state,action) => {
            state.filtered.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setPageRelated: (state,action) =>{
            state.related.page = action.payload
        },
        setPageFiltered: (state,action) => {
            state.filtered.page = action.payload
        }
    }
})
export const {
    setLoading,setEntities,setData,
    setRelated,setError,setLoadingRelated,
    setLoadingFiltered,setPageRelated,setFiltered,
    setPageFiltered } = homeSlide.actions
export default homeSlide.reducer