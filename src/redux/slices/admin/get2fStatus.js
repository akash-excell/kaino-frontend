import { createSlice } from "@reduxjs/toolkit";
import Axios from "@/utils/axios";
import { dispatch } from "../../store";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {}
}

const slice = createSlice({
    name: 'get2fStatus',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        get2fStatusSuccess(state, action) {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.data = { ...action.payload }
        },
        hasError(state, action) {
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.data = { ...action.payload }
        }
        ,
        get2fStatusReset(state) {
            state.data = {}
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function get2fStatusRequest() {
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.get('api/auth/active_status/')
            dispatch(slice.actions.get2fStatusSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { get2fStatusReset } = slice.actions