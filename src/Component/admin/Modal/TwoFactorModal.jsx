import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import styles from '@/styles/adminUserRoles.module.css'
import { TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { dispatch } from '@/redux/store'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { verifyOtpRequest, verifyOtpReset } from '@/redux/slices/verifyOtp'
import jwtDecode from 'jwt-decode'
import { getRole } from '@/utils/constant'

export default function TwoFactorModal({ setIsModal, isModal, data }) {
    const [errorText, setErrorText] = useState('')
    const verifyOtpState = useSelector(state => state.verifyOtp)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: yup.object({
            otp: yup.string().required('Otp is required')
                .matches(/^[0-9]{6}$/, 'OTP must be a 6-digit number')
        })
        ,
        onSubmit: (values) => {
            setErrorText('')
            const payload = { ...data, ...values }
            dispatch(verifyOtpRequest(payload))
        }
    })

    useEffect(() => {
        if (verifyOtpState.isError && verifyOtpState.data?.message) {
            setErrorText(verifyOtpState.data?.message)
            dispatch(verifyOtpReset())
        }

    }, [verifyOtpState.isError])

    useEffect(() => {
        if (verifyOtpState.isSuccess) {
            formik.resetForm()
            setIsModal(false)
            localStorage.setItem('token', verifyOtpState.data?.data?.access)
            const decoded = jwtDecode(verifyOtpState.data?.data?.access)
                const role = getRole(decoded?.role)
                if (role === 'Admin')
                    router.push('/dashboard/admin')
                else if (role === 'School Admin')
                    router.push('/dashboard/school')
            dispatch(verifyOtpReset())
        }

    }, [verifyOtpState.isSuccess])

    return (
        <Modal
            title="2 Factor Authentication"
            width={'600px'}
            style={{ textAlign: "center" }}
            centered
            open={isModal}
            onCancel={() => {
                setIsModal(false),
                    formik.resetForm(),
                    setErrorText('')
            }}
            footer={null}
        >
            <form onSubmit={formik.handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <div>
                        <TextField
                            focused
                            sx={{ width: "100%" }}
                            required
                            size='small'
                            id="outlined-adornment-otp"
                            label="Enter otp"
                            placeholder='Enter 6 digit otp sent to email'
                            variant="outlined"
                            name='otp'
                            value={formik.values.otp}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.otp && formik.errors.otp && <p style={{ marginBottom: '14px' }} className='formErrorText'>{formik.errors.otp}</p>}
                        {errorText && <p className='formErrorText'>{errorText}</p>}
                    </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <div className={styles.modalBtnContainer}>
                        <Button variant='outlined' onClick={() => setIsModal(false)}>Cancel</Button>
                        <Button type='submit' variant='contained' style={{ background: "#7367F0" }}
                            disabled={verifyOtpState.isLoading}>{verifyOtpState.isLoading ? 'Please wait...' : 'Verify otp'}</Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
