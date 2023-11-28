import { getSchoolBillingRequest, getSchoolBillingReset } from '@/redux/slices/school/getSchoolBilling'
import { dispatch } from '@/redux/store'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillSetting, AiOutlineBook, AiOutlineCreditCard, AiOutlineMobile } from 'react-icons/ai'
import { BsCashCoin } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const SchoolSubscriptions = () => {
    const [billingData, setBillingData] = useState({})
    const getSchoolBillingState = useSelector(state => state.getSchoolBilling)
    const router = useRouter()

    useEffect(() => {
        dispatch(getSchoolBillingRequest())
    }, [])

    useEffect(() => {
        if (getSchoolBillingState.isSuccess) {
            setBillingData(getSchoolBillingState.data?.data)
            dispatch(getSchoolBillingReset())
        }
    }, [getSchoolBillingState.isSuccess])

    const getBenefits = (benefitsData) => {
        const nameList = benefitsData.map(item => item.name);
        const joinedNames = nameList.join(", ");
        return joinedNames + " "
    }


    return (
        <Box sx={{ padding: "1rem" }}>
            <Box>
                <Typography variant='h6'>
                    Welcome, {billingData?.school_name}
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: '1rem', marginTop: 3 }}>

                    <Box onClick={() => router.push('/dashboard/school/billing')} sx={{ minHeight: '280px', background: '#4EAF96', borderRadius: '10px', padding: '1.5rem', color: '#fff', cursor: 'pointer' }}>
                        <Box sx={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <AiOutlineCreditCard size={'4rem'} color='#fff' />
                            <Box sx={{ minHeight: '120px' }}>
                                <Typography variant='h6'>
                                    Payment Overview
                                </Typography>
                                <Typography variant='body2' sx={{ marginTop: 1 }}>
                                    See vour profile data and
                                    manage your Account to
                                    choose what is saved in our
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <AiOutlineMobile />
                                <Typography variant='body2'>
                                    Payment Information
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box onClick={() => router.push('/dashboard/school/account-settings')} sx={{ minHeight: '280px', background: '#3A93D6', borderRadius: '10px', padding: '1.5rem', color: '#fff', cursor: 'pointer' }}>
                        <Box sx={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <AiFillSetting size={'4rem'} color='#fff' />
                            <Box sx={{ minHeight: '120px' }}>
                                <Typography variant='h6'>
                                    Security Setting
                                </Typography>
                                <Typography variant='body2' sx={{ marginTop: 1 }}>
                                    You have full control to
                                    manage your own account
                                    and keep account fully
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <AiOutlineMobile />
                                <Typography variant='body2'>
                                    Account Security Setting
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box onClick={() => router.push('/dashboard/school/accounts')} sx={{ minHeight: '280px', background: '#9E4EE0', borderRadius: '10px', padding: '1.5rem', color: '#fff', cursor: 'pointer' }}>
                        <Box sx={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <AiOutlineBook size={'4rem'} color='#fff' />
                            <Box sx={{ minHeight: '120px' }}>
                                <Typography variant='h6'>
                                    Billing Details
                                </Typography>
                                <Typography variant='body2' sx={{ marginTop: 1 }}>
                                    Check out all your payment
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <AiOutlineMobile />
                                <Typography variant='body2'>
                                    Payment Details
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box onClick={()=>router.push('/dashboard/school/school-payment')} sx={{ minHeight: '280px', background: '#EA8858', borderRadius: '10px', padding: '1.5rem', color: '#fff', cursor: 'pointer' }}>
                        <Box sx={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <BsCashCoin size={'4rem'} color='#fff' />
                            <Box sx={{ minHeight: '120px' }}>
                                <Typography variant='h6'>
                                    Make Payments
                                </Typography>
                                <Typography variant='body2' sx={{ marginTop: 1 }}>
                                    Check your reports of uses
                                    and manage your packages
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <AiOutlineMobile />
                                <Typography variant='body2'>
                                    Easy Payment Process
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '65% 34%', columnGap: '1rem' }}>
                    <Box
                        sx=
                        {{
                            background: '#fff',
                            color: '#1C3050',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            border: '2px solid #efefef',
                            minHeight: '350px'
                        }}
                    >
                        <Box sx={{ minHeight: '70px' }}>
                            <Typography sx={{ fontWeight: '700' }} variant='h6'>
                                Your Plan
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Typography sx={{ fontWeight: '500', fontSize: '1.2rem' }}>
                                {billingData?.plan_name || ''} Annual Member
                            </Typography>
                            <Typography sx={{ color: "#48C1C1" }} variant='h6'>
                                ${billingData?.price || 0}/Year
                            </Typography>
                            <Typography variant='body1'>
                                About {billingData?.plan_name || ''}. Members receive benefits which
                                include {getBenefits(billingData?.benefits || [])} and more.
                            </Typography>
                            <Button variant='contained' size='large' sx={{ width: 'fit-content' }} onClick={() => router.push('/dashboard/school/accounts')}>
                                See Plan
                            </Button>
                        </Box>
                        <hr style={{ height: '1px' }} />
                        <Box sx={{ marginTop: '2rem' }}>
                            <Typography>
                                Learn more about <span style={{ color: '#48c1c1' }}>our subscription plan options.</span>
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx=
                        {{
                            background: '#fff',
                            color: '#1C3050',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            border: '2px solid #efefef',
                            minHeight: '300px'
                        }}
                    >
                        <Box sx={{ minHeight: '70px' }}>
                            <Typography sx={{ fontWeight: '700' }} variant='h6'>
                                Account Suspended
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Typography sx={{ fontWeight: '500', fontSize: '1.2rem' }}>
                                We're here to help you!
                            </Typography>

                            <Typography variant='body1' sx={{ marginTop: '1.4rem' }}>
                                Ask a question or file a support or report an issues.
                                Our team support team will get back to you by email.
                            </Typography>

                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <Button variant='contained' size='large' sx={{ width: 'fit-content' }}
                                    onClick={() => {
                                        localStorage.clear()
                                        router.push('/requestAccess')
                                    }}
                                >
                                    Unlock Account
                                </Button>
                                <Button variant='contained' size='large' sx={{ width: 'fit-content' }}>
                                    Contact Us
                                </Button>
                            </Box>
                        </Box>
                        <hr style={{ height: '1px' }} />
                        <Box sx={{ marginTop: '2rem' }}>
                            <Typography sx={{ color: '#48c1c1' }}>
                                Learn more
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SchoolSubscriptions
