import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../Api";


export const isLoading = createAction('is/loading', (arg = '') => {
    return {
        payload: {
            arg
        }
    }
})

export const addCategoriesRequest = createAsyncThunk('add/categories', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.addCategories(payload)
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
})
export const allCategoriesRequest = createAsyncThunk('all/categories', async (_, thunkAPI) => {
    try {
        const {data} = await Api.allCategories()
        const {categories} = data
        return categories
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
})

export const updateCategoriesRequest = createAsyncThunk('update/categories', async (payload = {}, thunkAPI) => {
    try {
        const {} = payload
        const {data} = await Api.updateCategories(payload)
        thunkAPI.dispatch(allCategoriesRequest())
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
})
export const deleteCategoriesRequest = createAsyncThunk('delete/categories', async (id = 1, thunkAPI) => {
    try {
        const {data} = await Api.deleteCategories(id)
        thunkAPI.dispatch(allCategoriesRequest())
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
})
