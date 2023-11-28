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
    name: 'schoolPayments',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        schoolPaymentsSuccess(state, action) {
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
        schoolPaymentsReset(state) {
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function schoolPaymentsRequest(payload) {
    let url;
    if (payload)
        url = `api/subscription/payment_history/?${payload}`
    else
        url = 'api/subscription/payment_history/'
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.get(url)
            dispatch(slice.actions.schoolPaymentsSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { schoolPaymentsReset } = slice.actions