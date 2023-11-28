import { createSlice } from "@reduxjs/toolkit";
import Axios from "@/utils/axios";
import { dispatch } from "../store";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {}
}

const slice = createSlice({
    name: 'clearNotification',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        clearNotificationSuccess(state, action) {
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
        clearNotificationReset(state) {
            state.data = {}
            state.isSuccess = false
            state.isError = false
        }
    }
})

export function clearNotificationRequest() {

    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await Axios.delete('api/notification/')
            dispatch(slice.actions.clearNotificationSuccess(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { clearNotificationReset } = slice.actions