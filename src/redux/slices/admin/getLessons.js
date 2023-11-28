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
    name: 'getLessons',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        getLessonsSuccess(state, action) {
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
        getLessonsReset(state) {
            state.data = {}
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function getLessonsRequest(payload) {
    let url;
    if (payload)
        url = `api/get_lessons/${payload}`
    else
        url = 'api/get_lessons/'
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.get(url)
            dispatch(slice.actions.getLessonsSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { getLessonsReset } = slice.actions