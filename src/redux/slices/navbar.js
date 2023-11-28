import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCollapsed: true
}

const slice = createSlice({
    name: 'navbar',
    initialState: initialState,
    reducers: {
        setIsCollapsed(state) {
            state.isCollapsed ?
                state.isCollapsed = false :
                state.isCollapsed = true
        }
    }
})

export const { setIsCollapsed } = slice.actions

export default slice.reducer
