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
    name: 'createStudent',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        createStudentSuccess(state, action) {
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
        createStudentReset(state) {
            state.data = {}
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function createStudentRequest(payload) {
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.post('api/auth/student/', payload)
            dispatch(slice.actions.createStudentSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { createStudentReset } = slice.actions