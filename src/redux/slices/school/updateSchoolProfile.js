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
    name: 'updateSchoolProfile',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        updateSchoolProfileSuccess(state, action) {
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
        updateSchoolProfileReset(state) {
            state.isSuccess = false
            state.isError = false
            state.data = {}
        }
    }
})

export function updateSchoolProfileRequest(payload) {
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.patch(`api/school_profile/`, payload)
            dispatch(slice.actions.updateSchoolProfileSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { updateSchoolProfileReset } = slice.actions