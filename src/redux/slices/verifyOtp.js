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
    name: 'verifyOtp',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        verifyOtpSuccess(state, action) {
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
        verifyOtpReset(state) {
            state.data = {}
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function verifyOtpRequest(payload) {
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.post('api/auth/verify_otp/', payload)
            dispatch(slice.actions.verifyOtpSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { verifyOtpReset } = slice.actions