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
    name: 'updateInvoice',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        updateInvoiceSuccess(state, action) {
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
        updateInvoiceReset(state) {
            state.data = {}
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function updateInvoiceRequest(payload, id) {
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.patch(`api/subscription/invoice/${id}/`, payload)
            dispatch(slice.actions.updateInvoiceSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { updateInvoiceReset } = slice.actions