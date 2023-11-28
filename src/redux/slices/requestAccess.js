import { createSlice } from "@reduxjs/toolkit";
import Axios from "../../utils/axios";
import { dispatch } from '../store'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {}
}

const slice = createSlice({
    name: 'requestAccess',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        requestAccessSuccess(state, action) {
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
        requestAccessReset(state) {
            state.data = {}
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function requestAccess(payload) {
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.post('api/auth/request_access/',payload)
            dispatch(slice.actions.requestAccessSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { requestAccessReset } = slice.actions