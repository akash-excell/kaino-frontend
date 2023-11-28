import React from 'react'
import { Alert } from '@mui/material'

export default function AlertMessage({ type, message, handler }) {
    return (
        <Alert severity={type} onClose={handler} sx={{ marginBottom: '1rem' }}>{message}</Alert>
    )
}
