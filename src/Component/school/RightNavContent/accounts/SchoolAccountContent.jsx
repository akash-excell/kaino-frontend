import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SchoolBillingContent from './SchoolBillingContent'
import SchoolPersonalContent from './SchoolPersonalContent'
import { getSchoolDataRequest, getSchoolDataReset } from '@/redux/slices/school/getSchoolData'
import { dispatch } from '@/redux/store'
import { useSelector } from 'react-redux'
import { getSchoolBillingRequest, getSchoolBillingReset } from '@/redux/slices/school/getSchoolBilling'

const SchoolAccountContent = () => {
  const [key, setKey] = useState(1)
  const getSchoolDataState = useSelector(state => state.getSchoolData)
  const getSchoolBillingState = useSelector(state => state.getSchoolBilling)

  const [billingData, setBillingData] = useState({})
  const [accountData, setAccountData] = useState({})

  useEffect(() => {
    dispatch(getSchoolDataRequest())
    dispatch(getSchoolBillingRequest())
  }, [])

  useEffect(() => {
    if (getSchoolDataState.isSuccess) {
      setAccountData(getSchoolDataState.data?.data)
      dispatch(getSchoolDataReset())
    }
  }, [getSchoolDataState.isSuccess])

  useEffect(() => {
    if (getSchoolBillingState.isSuccess) {
      setBillingData(getSchoolBillingState.data?.data)
      dispatch(getSchoolBillingReset())
    }
  }, [getSchoolBillingState.isSuccess])

  return (
    <Box sx={{ padding: '2rem' }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant='h5' sx={{ fontWeight: '600' }}>
          My Account
        </Typography>
        <Box sx={{ display: 'flex', gap: '1.5rem' }}>
          <Button sx={{ width: "fit-content", background: '#3EB039', ':hover': { background: '#3EB039' } }} variant='contained' size='large' onClick={() => setKey(1)}>
            Billing
          </Button>
          <Button sx={{ width: "fit-content", background: '#40A2ED', ':hover': { background: "#40A2ED" } }} variant='contained' size='large' onClick={() => setKey(2)}>
            Personal
          </Button>
        </Box>
        {
          key == 1 ? <SchoolBillingContent data={billingData} /> : <SchoolPersonalContent data={accountData} />
        }
      </Box>
    </Box>
  )
}

export default SchoolAccountContent
