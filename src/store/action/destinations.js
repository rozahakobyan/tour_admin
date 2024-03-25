import {createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../Api";

export const addNewDestinationRequest = createAsyncThunk('destination/add-new', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.addDestinations(payload);
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
});


export const allDestinationRequest = createAsyncThunk('destination/all', async (_, thunkAPI) => {
    try {
        const {data} = await Api.allDestinations();
        const {destinations} = data
        return destinations
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
});
export const deleteDestinationRequest = createAsyncThunk('destination/delete', async (id = 0, thunkAPI) => {
    try {
        const {data} = await Api.deleteDestinations(id);
        thunkAPI.dispatch(allDestinationRequest())
        const {destinations} = data
        return destinations
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
});
export const updateDestinationRequest = createAsyncThunk('destination/update', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.updateDestinations(payload);
        thunkAPI.dispatch(allDestinationRequest())
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
});

