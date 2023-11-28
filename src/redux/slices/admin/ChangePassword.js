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
    name: 'ChangePassword',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        ChangePasswordSuccess(state, action) {
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
        ChangePasswordReset(state) {
            state.data = {}
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function ChangePasswordRequest(payload) {
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.post('/api/auth/password/', payload)
            dispatch(slice.actions.ChangePasswordSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { ChangePasswordReset } = slice.actions