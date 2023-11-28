import SchoolAccountCard from '@/Component/Generic/SchoolAccountCard'
import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AiOutlineCalendar, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import SchoolProfileEditModal from '../../Modal/SchoolProfileEditModal'

const SchoolPersonalContent = ({ data }) => {
    const [isModal, setIsModal] = useState(false)

    return (
        <Box sx={{ marginTop: '2rem' }}>
            {
                isModal && <SchoolProfileEditModal isModal={isModal} setIsModal={setIsModal} editData={data} />
            }
            <Box
                sx=
                {{
                    background: '#fff',
                    color: '#1C3050',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    minHeight: '320px',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: "space-between", gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Typography variant='h6'>
                        Personal Details
                    </Typography>
                    <Button sx={{ width: 'fit-content' }} variant='contained' size='large' onClick={() => setIsModal(true)}>
                        Edit
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                    <SchoolAccountCard icon={<AiOutlineUser />} title={'Full Name'} name={data?.first_name + " " + data?.last_name || ''} />
                    <SchoolAccountCard icon={<AiOutlineMail />} title={'Email'} name={data?.email} />
                    <SchoolAccountCard icon={<AiOutlinePhone />} title={'Phone Number'} name={data?.mobile_no} />
                    <SchoolAccountCard icon={<AiOutlineCalendar />} title={'Date of Birth'} name={data?.dob} />
                    <SchoolAccountCard icon={<GoLocation />} title={'Address'} name={Object.values(data?.address)?.join(' ')} />
                </Box>
            </Box>
        </Box >
    )
}

export default SchoolPersonalContent
