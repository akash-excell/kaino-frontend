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
    name: 'getTopOrg',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        getTopOrgSuccess(state, action) {
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
        getTopOrgReset(state) {
            state.data = {}
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function getTopOrgRequest() {
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.get(`api/top_org/`)
            dispatch(slice.actions.getTopOrgSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { getTopOrgReset } = slice.actions