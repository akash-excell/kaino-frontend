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
    name: 'getAllTeachers',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        getAllTeachersSuccess(state, action) {
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
        getAllTeachersReset(state) {
            state.data = {}
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function getAllTeachersRequest(payload) {
    let url;
    if (payload)
        url = `api/auth/teacher_search/${payload}`
    else
        url = 'api/auth/teacher_search/'
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.get(url)
            dispatch(slice.actions.getAllTeachersSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { getAllTeachersReset } = slice.actions