import {createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../Api";

export const addTourRequest = createAsyncThunk('add/tour', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.addTour(payload)
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
})

export const listTourRequest = createAsyncThunk('list/tour', async (page = 1, thunkAPI) => {
    try {
        const {data} = await Api.allTour(page)
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
})

export const itemTourRequest = createAsyncThunk('item/tour', async (id = 1, thunkAPI) => {
    try {
        const {data} = await Api.itemTour(id)
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
})
export const deleteTourRequest = createAsyncThunk('delete/tour', async (id = 1, thunkAPI) => {
    try {
        const {data} = await Api.deleteTour(id)
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
})

export const updateTourRequest = createAsyncThunk('update/tour', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.updateTour(payload);
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
})
export const deleteGalleryItemTourRequest = createAsyncThunk('gallery-img/tour', async (id, thunkAPI) => {
    try {
        const {data} = await Api.deleteTourGallery(id);
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
})
export const deleteScheduleItemTourRequest = createAsyncThunk('gallery-img/tour', async (id, thunkAPI) => {
    try {
        const {data} = await Api.deleteTourSchedule(id);
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
})