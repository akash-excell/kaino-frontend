import React, { useEffect, useState } from 'react'
import styles from '@/styles/adminFinance.module.css'
import { Box, Button, Typography } from '@mui/material'
import SchoolPaymentsTable from '../../table/SchoolPaymentsTable'
import { schoolPaymentsRequest, schoolPaymentsReset } from '@/redux/slices/school/schoolPayments'
import { dispatch } from '@/redux/store'
import { useSelector } from 'react-redux'

const SchoolBillingHistory = () => {
  const [data, setData] = useState([])
  const [response, setResponse] = useState({})

  const schoolPaymentsState = useSelector(state => state.schoolPayments)

  useEffect(() => {
    dispatch(schoolPaymentsRequest())
  }, [])

  useEffect(() => {
    if (schoolPaymentsState.isSuccess) {
      setData(schoolPaymentsState.data?.data?.results)
      setResponse(schoolPaymentsState.data?.data)
      dispatch(schoolPaymentsReset())
    }
  }, [schoolPaymentsState.isSuccess])

  const handlePagination = (requestUrl) => {
    dispatch(schoolPaymentsRequest(`${requestUrl.split('?')[1]}`))
  }

  return (
    <Box sx={{ padding: "1rem" }}>

      <Typography variant='h5'>
        Payments History
      </Typography>

      <div className={styles.invocesContainer}>
        <p className={styles.tableText}>Payments Overview</p>
        <SchoolPaymentsTable data={data} />
      </div>
      <div className={styles.bottom_Pagination}>
        <p>Showing {response?.count ? 1 : 0} to {response?.count || 0} of {response?.count || 0} entries</p>
        <div>
          <Button disabled={!response.previous} variant="outlined" onClick={() => handlePagination(response.previous)} size="medium">Previous</Button>
          <Button variant="contained" size="medium">1</Button>
          <Button disabled={!response.next} variant="outlined" onClick={() => handlePagination(response.next)} size="medium">Next</Button>
        </div>
      </div>
    </Box>
  )
}

export default SchoolBillingHistory
