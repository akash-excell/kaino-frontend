import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import styles from '@/styles/adminUserRoles.module.css'
import { TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { dispatch } from '@/redux/store'
import { ChangePasswordRequest, ChangePasswordReset } from '@/redux/slices/admin/ChangePassword'
import * as yup from 'yup'
import { useRouter } from 'next/router'

export default function ChangePasswordModal({ setIsModal, isModal }) {
    const [errorMessages, setErrorMessages] = useState({})
    const ChangePasswordState = useSelector(state => state.ChangePassword)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            current_password: '',
            new_password: '',
            re_password: ''
        },
        validationSchema: yup.object({
            new_password: yup.string().required('Enter your new password')
                .min(8, 'Password must be 8 characters long')
                .matches(/[0-9]/, 'Password requires a number')
                .matches(/[a-z]/, 'Password requires a lowercase letter')
                .matches(/[A-Z]/, 'Password requires an uppercase letter'),
            re_password: yup.string().required('Confirm your new password')
                .oneOf([yup.ref('new_password')], 'Confirm password and new password must be same')
        })
        ,
        onSubmit: (values) => {
            setErrorMessages({})
            dispatch(ChangePasswordRequest(values))
        }
    })

    useEffect(() => {
        if (ChangePasswordState.isError && ChangePasswordState.data?.message) {
            setErrorMessages(ChangePasswordState.data?.message)
            dispatch(ChangePasswordReset())
        }

    }, [ChangePasswordState.isError])

    useEffect(() => {
        if (ChangePasswordState.isSuccess) {
            formik.resetForm()
            setIsModal(false)
            dispatch(ChangePasswordReset())
            localStorage.clear()
            router.push('/')
        }

    }, [ChangePasswordState.isSuccess])

    return (
        <Modal
            title="Change Password"
            width={'900px'}
            centered
            open={isModal}
            onCancel={() => setIsModal(false)}
            footer={null}
        >
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.modalForm}>
                    <div>
                        <TextField
                            focused
                            sx={{ width: "100%" }}
                            required
                            type='password'
                            size='small'
                            id="outlined-adornment-current_password"
                            label="Current Password"
                            placeholder='Current Password'
                            variant="outlined"
                            name='current_password'
                            value={formik.values.current_password}
                            onChange={formik.handleChange}
                        />
                        {errorMessages?.current_password && <p className='formErrorText'>{errorMessages?.current_password[0]}</p>}
                    </div>
                    <div>
                        <TextField
                            focused
                            sx={{ width: "100%" }}
                            required
                            type='password'
                            size='small'
                            id="outlined-adornment-new_password"
                            label="New Password"
                            placeholder='New Password'
                            variant="outlined"
                            name='new_password'
                            value={formik.values.new_password}
                            onChange={formik.handleChange}
                        />
                        {errorMessages?.new_password && <p className='formErrorText'>{errorMessages?.new_password[0]}</p>}
                        {formik.touched.new_password && formik.errors.new_password && <p style={{ marginBottom: '14px' }} className='formErrorText'>{formik.errors.new_password}</p>}
                    </div>
                    <div>
                        <TextField
                            focused
                            sx={{ width: "100%" }}
                            required
                            type='password'
                            size='small'
                            id="outlined-adornment-re_password"
                            label="Confirm New Password"
                            placeholder='Confirm New Password'
                            variant="outlined"
                            name='re_password'
                            value={formik.values.re_password}
                            onChange={formik.handleChange}
                        />
                        {errorMessages?.re_password && <p className='formErrorText'>{errorMessages?.re_password[0]}</p>}
                        {formik.touched.re_password && formik.errors.re_password && <p style={{ marginBottom: '14px' }} className='formErrorText'>{formik.errors.re_password}</p>}
                    </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <div className={styles.modalBtnContainer}>
                        <Button variant='outlined' onClick={() => setIsModal(false)}>Cancel</Button>
                        <Button type='submit' variant='contained' style={{ background: "#7367F0" }}
                            disabled={ChangePasswordState.isLoading}>{ChangePasswordState.isLoading ? 'Please wait...' : 'Save details'}</Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
