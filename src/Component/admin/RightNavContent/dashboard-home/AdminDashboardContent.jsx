import React, { useEffect, useState } from 'react'
import styles from '@/styles/adminDashboardContent.module.css'
import CounterCard from '../../../Generic/CounterCard'
import { FaRegBuilding } from 'react-icons/fa'
import { BsTerminal } from 'react-icons/bs'
import { AiOutlineUserAdd } from 'react-icons/ai';
import { IoIosPeople } from 'react-icons/io'
import { BiBookOpen, BiDonateHeart } from 'react-icons/bi'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { dispatch } from '@/redux/store'
import { getDashboardCountRequest, getDashboardCountReset } from '@/redux/slices/admin/getDashboardCount'
import Link from 'next/link'

const FaRegBuildingIcon = <FaRegBuilding size={'2.6rem'} color='#9E4EE0' />
const BsTerminalIcon = <BsTerminal size={'2.6rem'} color='#EA8858' />
const AiOutlineUserAddIcon = <AiOutlineUserAdd size={'2.6rem'} color='#C6164F' />
const IoIosPeopleIcon = <IoIosPeople size={'2.6rem'} color='#4EAF96' />


function AdminDashboardContent() {
  const [countData, setCountData] = useState({})
  const getDashboardCountState = useSelector(state => state.getDashboardCount)

  useEffect(() => {
    dispatch(getDashboardCountRequest())
  }, [])

  useEffect(() => {
    if (getDashboardCountState.isSuccess) {
      setCountData(getDashboardCountState.data?.data)
      dispatch(getDashboardCountReset())
    }
  }, [getDashboardCountState.isSuccess])

  return (
    <div>
      <div className={styles.card_container}>
        <div className={styles.card_innerContainer}>
          <CounterCard
            to='/dashboard/admin/all-schools'
            color={'#9E4EE0'}
            icon={FaRegBuildingIcon}
            totalText={'Schools'}
            totalNo={countData?.schools || 0}
          />
          <CounterCard
            to='/dashboard/admin/all-students'
            color={'#C6164F'}
            icon={AiOutlineUserAddIcon}
            totalText={'Students'}
            totalNo={countData?.students || 0}
          />
          <div className={styles.card_left} style={{ background: '#6759D1' }}>
            <div style={{ zIndex: 3 }}>
              <p>School Paid</p>
              <p className={styles.cardLeft_textSize}>{countData?.paid_data?.schools_paid || 0}/{countData?.schools || 0}</p>
            </div>
            <div style={{ zIndex: 3 }}>
              <p>Amount Paid</p>
              <p className={styles.cardLeft_textSize}>$ {countData?.paid_data?.amount_paid[0] || 0}</p>
            </div>
            <div style={{ zIndex: 3 }}>
              <p>Amount due</p>
              <p className={styles.cardLeft_textSize}>$ {countData?.paid_data?.amount_due[0] || 0}</p>
            </div>
            <div className={styles.circleDiv}>
            </div>
          </div>

        </div>
        <div className={styles.card_innerContainer}>
          <CounterCard
            to='/dashboard/admin/all-teachers'
            color={'#EA8858'}
            icon={BsTerminalIcon}
            totalText={'Teachers'}
            totalNo={countData?.teachers || 0}
          />
          <CounterCard
            to='/dashboard/admin/all-parents'
            color={'#4EAF96'}
            icon={IoIosPeopleIcon}
            totalText={'Parents'}
            totalNo={countData?.parents || 0}
          />
          <Link href={'/dashboard/admin/all-organization'} className={styles.card_left} style={{ background: '#2896A0' }}>
            <div style={{ display: "flex", gap: '2rem' }}>
              <div style={{ background: "#fff", padding: '.7rem', borderRadius: "12px" }}>
                <BiDonateHeart size={'2.4rem'} color='#2896A0' />
              </div>
              <div>
                <p style={{ fontSize: '1rem', fontWeight: '500' }}>Total Orgnizations</p>
                <p style={{ fontSize: '2rem', fontWeight: '700' }} className={styles.bigCard_Number}>
                  {countData?.organizations?.total}
                </p>
              </div>
            </div>
            <table style={{ borderSpacing: "0 0.5rem" }}>
              <tbody>
                <tr>
                  <th style={{ textAlign: 'inherit', fontSize: "1rem", fontWeight: '500' }}>Top rankings</th>
                  <th style={{ textAlign: 'inherit', fontSize: "1rem", fontWeight: '500' }}>Students</th>
                </tr>
                {
                  countData?.organizations?.data?.map((item, i) => <tr key={i} className={styles.table_tr}>
                    <td>{item?.name}</td>
                    <td>{`${item?.total_students}%`}</td>
                  </tr>)
                }
              </tbody>
            </table>
          </Link>

        </div>
        <div className={styles.right_flnCard}>
          <p className={styles.flnText}>FLN IMPACT</p>
          <div className={styles.fln_Icon}>
            <BiBookOpen color='#3D5EE1' size={'3rem'} />
            <p className={styles.fln_Icon_Number}>{countData?.fln_over_all}</p>
          </div>
          <p className={styles.performance_text}>Overall Performance Foundational
            Learning and Numeracy Impact</p>
          <table style={{ margin: 'auto', marginTop: "1rem", color: '#cccaca', borderSpacing: '0 0.8rem', textAlign: 'left', padding: "0 1rem" }}>
            <tbody>
              <tr style={{ color: '#a24b79' }}>
                <th>Accessment Area</th>
                <th>Numbers</th>
              </tr>
              {
                countData?.fln_impact?.map((item, i) => <tr key={i}>
                  <td style={{ fontWeight: '500' }}>{item?.accessment_area}:</td>
                  <td style={{ fontWeight: '500', textAlign: 'center' }}>{item?.numbers}</td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
      </div >
      <div className={styles.copyright}>
        <p>COPYRIGHT &copy; 2023 KAINO.</p>
      </div>
    </div>
  )
}

export default AdminDashboardContent
