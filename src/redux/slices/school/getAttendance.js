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
    name: 'getAttendance',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        getAttendanceSuccess(state, action) {
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
        getAttendanceReset(state) {
            state.isSuccess = false
            state.isError = false
            state.data = {}
        }
    }
})

export function getAttendanceRequest(query) {
    return async () => {
        let baseUrl;
        if (query)
            baseUrl = `api/auth/roll_call_graph/?${query}`
        else
            baseUrl = `api/auth/roll_call_graph/?weekly=1`
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.get(baseUrl)
            dispatch(slice.actions.getAttendanceSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { getAttendanceReset } = slice.actions