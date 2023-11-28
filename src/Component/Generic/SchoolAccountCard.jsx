import { Box, Typography } from '@mui/material'
import React from 'react'

const SchoolAccountCard = ({ icon, title, name }) => {
    return (
        <Box sx={{ display: 'flex', gap: '4rem' }}>
            <Box sx={{ display: 'flex', gap: '10px', width: '20%' }}>
                <Typography sx={{ fontWeight: '600', fontSize: '1rem' }}>
                    {icon}
                </Typography>
                <Typography sx={{ fontWeight: '600', fontSize: '1rem' }}>
                    {title}
                </Typography>
            </Box>
            <Box>
                <Typography sx={{ fontWeight: '600', fontSize: '1rem' }}>
                    {name}
                </Typography>
            </Box>
        </Box>
    )
}

export default SchoolAccountCard
