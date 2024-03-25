import {createReducer} from "@reduxjs/toolkit";
import {addNewDestinationRequest, allDestinationRequest, updateDestinationRequest} from "../action/destinations";


const initialState = {
    list: [],
    item: {},
    loading: false,
    errors: {}
}
export const destination = createReducer(initialState, (builder) => {
    builder
        .addCase(addNewDestinationRequest.pending, (state) => {
            state.loading = true
        })
        .addCase(addNewDestinationRequest.fulfilled, (state, action) => {
            state.loading = false
            state.item = action.payload
        })
        .addCase(addNewDestinationRequest.rejected, (state, action) => {
            state.loading = false
            state.errors = action
        })
        .addCase(allDestinationRequest.pending, (state, action) => {
            state.loading = true
        })
        .addCase(allDestinationRequest.fulfilled, (state, action = []) => {
            state.loading = false
            state.list = action.payload
        })
        .addCase(allDestinationRequest.rejected, (state, action) => {
            state.loading = false
            state.errors = action
        })
        .addCase(updateDestinationRequest.rejected, (state, action) => {
            state.errors = action?.errors
        })
})
