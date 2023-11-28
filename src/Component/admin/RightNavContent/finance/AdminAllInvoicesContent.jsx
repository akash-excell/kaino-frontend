import React from 'react'
import styles from '@/styles/adminFinance.module.css'
import { Box, Button } from '@mui/material'
import InvoicesTable from '../../Table/InvoicesTable'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Tabs } from 'antd'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import { BiBookmarkAltMinus, BiNotepad } from 'react-icons/bi'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { dispatch } from '@/redux/store'
import { getAllInvoicesRequest, getAllInvoicesReset } from '@/redux/slices/admin/getAllInvoices'

const AdminAllInvoicesContent = () => {
  const [data, setData] = useState([])
  const [response, setResponse] = useState({})
  const [type, setType] = useState('')
  const getAllInvoicesState = useSelector(state => state.getAllInvoices)
  const router = useRouter()

  useEffect(() => {
    if (type)
      dispatch(getAllInvoicesRequest(type))
    else
      dispatch(getAllInvoicesRequest())
  }, [type])

  useEffect(() => {
    if (getAllInvoicesState.isSuccess) {
      setData(getAllInvoicesState.data?.data?.results)
      setResponse(getAllInvoicesState.data?.data)
      dispatch(getAllInvoicesReset())
    }
  }, [getAllInvoicesState.isSuccess])

  const handlePagination = (requestUrl) => {
    if (type)
      dispatch(getAllInvoicesRequest(`${type} & ${requestUrl.split('?')[1]}`))
    else
      dispatch(getAllInvoicesRequest(`${requestUrl.split('?')[1]}`))
  }

  const handleTabsChange = (key) => {
    const tabkey = parseInt(key)
    if (tabkey === 1)
      setType('')
    else if (tabkey === 2)
      setType('status=paid')
    else if (tabkey === 3)
      setType('status=overdue')
    else if (tabkey === 4)
      setType('status=draft')
    else if (tabkey === 5)
      setType('status=recurring')
    else if (tabkey === 6)
      setType('status=cancelled')
    else
      setType('status=unpaid')
  }

  return (
    <div>
      <div className={styles.invoicesBtn}>
        <p>Invoices</p>
        <p>Dashboard / <span style={{ opacity: .7 }}>Invoices</span></p>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: "wrap" }}>
        <Tabs
          defaultActiveKey="1"
          style={{ marginTop: "2rem" }}
          onChange={(key) => handleTabsChange(key)}
          items={[
            {
              label: `All Invoice`,
              key: '1',
            },
            {
              label: `Paid`,
              key: '2',
            },
            {
              label: `Unpaid`,
              key: '7',
            },
            {
              label: `Overdue`,
              key: '3',
            },
            {
              label: `Draft`,
              key: '4',
            },
            {
              label: `Reccuring`,
              key: '5',
            },
            {
              label: `Cancelled`,
              key: '6',
            },
          ]}
        />
        <Button sx={{ height: '4rem' }} variant='contained' size='large' onClick={() => router.push('/dashboard/admin/new-invoice')}>New Invoice</Button>
      </Box>
      <div className={styles.finance_card_container}>
        <div className={`${styles.finance_card} ${styles.invoices_card}`}>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <FaFileInvoiceDollar size={'3.2rem'} />
            <p style={{ fontSize: '1.8rem', fontWeight: '700' }}>${response?.total_amount}</p>
          </Box>
          <Box sx={{ display: 'flex', gap: '1rem', marginTop: 4, alignItems: 'center' }}>
            <p style={{ fontSize: '1rem', fontWeight: '600' }}>All Invoices</p>
            <p style={{ fontSize: '12px' }}>{response?.count_total}</p>
          </Box>
        </div>

        <div className={`${styles.finance_card} ${styles.invoices_card}`} style={{ background: '#3A93D6' }}>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <BiBookmarkAltMinus size={'3.2rem'} />
            <p style={{ fontSize: '1.8rem', fontWeight: '700' }}>${response?.paid_amount}</p>
          </Box>
          <Box sx={{ display: 'flex', gap: '1rem', marginTop: 4, alignItems: 'center' }}>
            <p style={{ fontSize: '1rem', fontWeight: '600' }}>Paid Invoices</p>
            <p style={{ fontSize: '12px' }}>{response?.count_paid}</p>
          </Box>
        </div>

        <div className={`${styles.finance_card} ${styles.invoices_card}`} style={{ background: '#9E4EE0' }}>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <AiOutlineDollarCircle size={'3.2rem'} />
            <p style={{ fontSize: '1.8rem', fontWeight: '700' }}>${response?.unpaid_amount}</p>
          </Box>
          <Box sx={{ display: 'flex', gap: '1rem', marginTop: 4, alignItems: 'center' }}>
            <p style={{ fontSize: '1rem', fontWeight: '600' }}>Unpaid Invoices</p>
            <p style={{ fontSize: '12px' }}>{response?.count_unpaid}</p>
          </Box>
        </div>

        <div className={`${styles.finance_card} ${styles.invoices_card}`} style={{ background: '#EA8858' }}>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <BiNotepad size={'3.2rem'} />
            <p style={{ fontSize: '1.8rem', fontWeight: '700' }}>${response?.overDue_amount}</p>
          </Box>
          <Box sx={{ display: 'flex', gap: '1rem', marginTop: 4, alignItems: 'center' }}>
            <p style={{ fontSize: '1rem', fontWeight: '600' }}>Over due</p>
            <p style={{ fontSize: '12px' }}>{response?.count_overdue}</p>
          </Box>
        </div>

      </div>
      <div className={styles.invocesContainer}>
        <p className={styles.tableText}>Latest Payments</p>
        <InvoicesTable data={data} />
        <div className={styles.bottom_Pagination}>
          <p>Showing {response?.count ? 1 : 0} to {response?.count || 0} of {response?.count || 0} entries</p>
          <Button variant='outlined' size='large'>Show More</Button>
          <div>
            <Button disabled={!response.previous} variant="outlined" onClick={() => handlePagination(response.previous)} size="medium">Previous</Button>
            <Button variant="contained" size="medium">1</Button>
            <Button disabled={!response.next} variant="outlined" onClick={() => handlePagination(response.next)} size="medium">Next</Button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminAllInvoicesContent
