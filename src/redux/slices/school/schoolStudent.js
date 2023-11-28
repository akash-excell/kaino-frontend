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
    name: 'schoolStudent',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        schoolStudentSuccess(state, action) {
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
        schoolStudentReset(state) {
            state.isSuccess = false
            state.isError = false
            state.data = {}
        }
    }
})

export function schoolStudentRequest(query) {
    return async () => {
        let baseUrl;
        if (query)
            baseUrl = `api/std_list/?${query}`
        else
            baseUrl = `api/std_list/`
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.get(baseUrl)
            dispatch(slice.actions.schoolStudentSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { schoolStudentReset } = slice.actions