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
    name: 'schoolParent',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        schoolParentSuccess(state, action) {
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
        schoolParentReset(state) {
            state.isSuccess = false
            state.isError = false
            state.data = {}
        }
    }
})

export function schoolParentRequest(query) {
    return async () => {
        let baseUrl;
        if (query)
            baseUrl = `api/parent_list/?${query}`
        else
            baseUrl = `api/parent_list/`
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.get(baseUrl)
            dispatch(slice.actions.schoolParentSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { schoolParentReset } = slice.actions