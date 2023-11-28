import React from 'react'
import styles from '@/styles/adminDashboardContent.module.css'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { dispatch } from '@/redux/store'
import { getCoverrageRequest, getCoverrageReset } from '@/redux/slices/school/getCoverrage'

const SchoolLessonCoverage = () => {

  const getCoverrageState = useSelector(state => state.getCoverrage)

  useEffect(() => {
    dispatch(getCoverrageRequest())
  }, [])

  useEffect(() => {
    if (getCoverrageState.isSuccess) {
      getCoverrageReset()
    }
  }, [getCoverrageState.isSuccess])

  const getWidth = (data) => {
    const width = Math.ceil((data?.covered / data?.total) * 100)
    console.log(width);
    const remainingWidth = 100 - width
    return {
      width: width,
      remainingWidth: remainingWidth
    }
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr", columnGap: "1rem", '@media (max-width:1095px)': { gridTemplateColumns: "1fr 1fr" }, '@media (max-width:800px)': { gridTemplateColumns: "1fr", rowGap: '1rem' } }}>

      {
        getCoverrageState.data?.data?.map((item, i) => <Box key={i} className={styles.card} sx={{ background: '#FFFFFF', padding: '1.2rem', boxShadow: '3px 3px 3px 0px #f1e9e9' }}>

          <Box className={styles.icon_Container} sx={{ background: "#891B55 !important" }}>
            <Typography sx={{ fontSize: '2.6rem', color: '#fff', fontWeight: '600' }}>
              {item.class}
            </Typography>
          </Box>
          <Box className={styles.totalTextContainer} sx={{ width: "70%" }}>
            <Typography variant='h6' sx={{ color: '#891B55', fontWeight: "700" }}>{item.covered} of {item.total}</Typography>

            <Typography>
              Lessons Covered
            </Typography>

            <Box sx={{ height: '25px', background: '#E9E9E9', borderRadius: '12px', display: 'flex', alignItems: "center", overflow: 'hidden' }}>
              <Typography variant='body1'
                sx={{
                  height: '25px',
                  borderRadius: '12px',
                  width: `${getWidth(item).width || 10}%`,
                  textAlign: 'center',
                  background: '#891B55',
                  color: '#fff',
                  fontWeight: '800'
                }}
              >
                {item.covered}
              </Typography>

              <Typography variant='body1'
                sx={{
                  height: '25px',
                  width: `${getWidth(item).remainingWidth || 90}%`,
                  textAlign: 'center',
                  color: '#891B55',
                  fontWeight: '800'
                }}
              >
                {item.total}
              </Typography>
            </Box>
          </Box>
        </Box>)
      }
    </Box>
  )
}

export default SchoolLessonCoverage
