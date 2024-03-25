import {createReducer} from "@reduxjs/toolkit";
import {addTourRequest, itemTourRequest, listTourRequest, updateTourRequest} from "../action/tours";


const initialState = {
    list: {},
    item: null,
    message: {},
    loading: false,
    errors: {}
}

export const tours = createReducer(initialState, (builder) => {
    builder
        .addCase(addTourRequest.pending, (state) => {
            state.loading = true
            state.errors = {}
        })
        .addCase(addTourRequest.fulfilled, (state, action) => {
            state.loading = false
            state.item = action.payload
        })
        .addCase(addTourRequest.rejected, (state, action) => {
            state.loading = false
            const {errors} = action.payload
            if (errors) {
                state.errors = errors
            }
        })
        .addCase(listTourRequest.pending, (state) => {
            state.loading = true
        })
        .addCase(listTourRequest.fulfilled, (state, action) => {
            state.loading = false
            state.list = action.payload
        })
        .addCase(listTourRequest.rejected, (state, action) => {
            const {errors} = action.payload
            if (errors) {
                state.errors = errors
            }
        })
        .addCase(itemTourRequest.pending, (state) => {
            state.loading = true
        })
        .addCase(itemTourRequest.fulfilled, (state, action) => {
            state.loading = false
            state.item = action.payload
        })
        .addCase(itemTourRequest.rejected, (state, action) => {
            const {errors} = action.payload
            if (errors) {
                state.errors = errors
            }
        })
        .addCase(updateTourRequest.pending, (state) => {
            state.loading = true
        })
        .addCase(updateTourRequest.fulfilled, (state, action) => {
            state.loading = false
            state.item = action.payload
        })
        .addCase(updateTourRequest.rejected, (state, action) => {
            const {errors} = action.payload
            state.loading = false
            if (errors) {
                state.errors = errors
            }
        })
})

