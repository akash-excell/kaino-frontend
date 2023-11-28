import { createSlice } from "@reduxjs/toolkit";
import Axios from "@/utils/axios";
import { dispatch } from "../../store";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {
        data: []
    }
}

const slice = createSlice({
    name: 'getClassTeacher',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        getClassTeacherSuccess(state, action) {
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
        getClassTeacherReset(state) {
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function getClassTeacherRequest() {
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.get('api/classes_data/')
            dispatch(slice.actions.getClassTeacherSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { getClassTeacherReset } = slice.actions