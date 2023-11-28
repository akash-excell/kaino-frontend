import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: ''
}

const slice = createSlice({
    name: 'headerTitle',
    initialState: initialState,
    reducers: {
        setHeader(state, action) {
            state.title = action.payload
        }
    }
})

export const { setHeader } = slice.actions

export default slice.reducer
