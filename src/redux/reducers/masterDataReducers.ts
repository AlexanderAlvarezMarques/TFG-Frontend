import {createSlice} from "@reduxjs/toolkit";

const initialState: MasterStorage = {
    provinces: [],
    cities: [],
    sports: [],
    lastUpdate: null
}

const masterDataSlicer = createSlice({
    name: 'masterData',
    initialState,
    reducers: {
        setMasterData: (state, action) => {
            const { provinces, cities, sports } = action.payload;
            state.provinces = provinces;
            state.cities = cities;
            state.sports = sports;
            state.lastUpdate = Date.now();
        },
        clear: (state) => {
            Object.assign(state, initialState);
        }
    }
})

export const {
    setMasterData,
    clear
} = masterDataSlicer.actions

export default masterDataSlicer.reducer
