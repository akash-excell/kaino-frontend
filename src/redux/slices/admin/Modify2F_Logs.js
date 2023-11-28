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
    name: 'Modify2F_Logs',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        Modify2F_LogsSuccess(state, action) {
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
        Modify2F_LogsReset(state) {
            state.data = {}
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function Modify2F_LogsRequest(payload) {
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.patch('api/auth/config/', payload)
            dispatch(slice.actions.Modify2F_LogsSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { Modify2F_LogsReset } = slice.actions