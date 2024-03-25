import {createReducer} from "@reduxjs/toolkit";
import {addCategoriesRequest, allCategoriesRequest, isLoading} from "../action/categories";


const initialState = {
    list: [],
    message: {},
    loading: false,
    errors: {}
}

export const categories = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.message.isLoading = action.payload.arg
        })
        .addCase(addCategoriesRequest.pending, (state) => {
            state.loading = true
        })
        .addCase(addCategoriesRequest.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload
        })
        .addCase(addCategoriesRequest.rejected, (state, action) => {
            const {errors} = action.payload
            state.loading = false
            state.errors = errors
        })
        .addCase(allCategoriesRequest.pending, (state) => {
            state.loading = true
        })
        .addCase(allCategoriesRequest.fulfilled, (state, action = {}) => {
            state.loading = false
            state.list = action.payload
        })
        .addCase(allCategoriesRequest.rejected, (state, action) => {
            const {errors} = action.payload
            state.loading = false
            state.errors = errors
        })
})

