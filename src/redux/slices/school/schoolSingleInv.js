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
    name: 'schoolSingleInv',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        schoolSingleInvSuccess(state, action) {
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
        schoolSingleInvReset(state) {
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function schoolSingleInvRequest(id) {
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.get(`api/subscription/school_invoice/?pk=${id}`)
            dispatch(slice.actions.schoolSingleInvSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { schoolSingleInvReset } = slice.actions