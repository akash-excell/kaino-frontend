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
    name: 'getAllStudents',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        getAllStudentsSuccess(state, action) {
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
        getAllStudentsReset(state) {
            state.data = {}
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function getAllStudentsRequest(payload) {
    let url;
    if (payload)
        url = `api/auth/student_search/${payload}`
    else
        url = 'api/auth/student_search/'
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.get(url)
            dispatch(slice.actions.getAllStudentsSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { getAllStudentsReset } = slice.actions