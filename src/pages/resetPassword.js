import React, { useEffect } from 'react'
import styles from '@/styles/Home.module.css'
import stylesRequest from '@/styles/RequestAccess.module.css'
import Image from 'next/image'
import { Button, InputAdornment, TextField } from '@mui/material'
import { AiOutlineLock } from 'react-icons/ai'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { loader_text } from '@/utils/constant'
import { dispatch } from '@/redux/store'
import { resetPasswordRequest, resetPasswordReset } from '@/redux/slices/resetPassword'
import { useSelector } from 'react-redux'
import AlertMessage from '@/Component/Generic/AlertMessage'
import { useRouter } from 'next/router'

const resetPassword = () => {
    const router = useRouter()
    const { uid, token } = router.query

    const resetPasswordState = useSelector(state => state.resetPassword)

    const validationSchema = yup.object({
        password: yup.string().required('Enter your new password')
            .min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
        ,
        confirm_password: yup.string().required('Confirm your new password')
            .oneOf([yup.ref('password')], 'Confirm password and new password must be same')
    })

    const formHandler = useFormik({
        initialValues: {
            password: '',
            confirm_password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (uid && token) {
                const payload = {
                    ...values,
                    uid: uid,
                    token: token
                }
                dispatch(resetPasswordRequest(payload))
            }
            else
                router.push('/')
        }
    })

    return (
        <div className={styles.mainDiv}>
            <div className={styles.inner_div}>
                <div className={styles.leftDiv}>
                    <div className={styles.imageDiv}>
                        <Image src={"/images/circleImage.png"} width={130} height={130} alt='circle' /><Image src={"/images/dottedImage.png"} width={130} height={130} alt='circle' />
                    </div>

                </div>
                <div className={styles.rightDiv}>
                    <div style={{ marginBottom: "1rem" }}>
                        <h2>Reset Password</h2>
                    </div>
                    <form onSubmit={formHandler.handleSubmit}>

                        {resetPasswordState.isSuccess && <AlertMessage type='success' message={resetPasswordState.data?.message} handler={() => {
                            dispatch(resetPasswordReset()),
                                router.push('/')
                        }} />}

                        <TextField
                            focused
                            size='small'
                            fullWidth
                            id="outlined-adornment-password"
                            label="Enter your new password"
                            variant="outlined"
                            sx={{ marginBottom: '1rem' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="start"><AiOutlineLock color='#891B55' /></InputAdornment>,
                            }}
                            type='password'
                            name='password'
                            value={formHandler.values.password}
                            onChange={formHandler.handleChange}
                        />
                        {formHandler.touched.password && formHandler.errors.password && <p style={{ marginBottom: '14px' }} className='formErrorText'>{formHandler.errors.password}</p>}

                        <TextField
                            focused
                            size='small'
                            fullWidth
                            id="outlined-adornment-confirm_password"
                            label="Confirm your new password"
                            variant="outlined"
                            sx={{ marginBottom: '0.5rem' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="start"><AiOutlineLock color='#891B55' /></InputAdornment>,
                            }}
                            type='password'
                            name='confirm_password'
                            value={formHandler.values.confirm_password}
                            onChange={formHandler.handleChange}
                        />

                        {formHandler.touched.confirm_password && formHandler.errors.confirm_password && <p className='formErrorText'>{formHandler.errors.confirm_password}</p>}

                        <Button className={stylesRequest.requestButton} type='submit' fullWidth variant='contained' sx={{ backgroundColor: '#3D5EE1', marginBottom: "1.5rem", boxShadow: 'none' }} disabled={resetPasswordState.isLoading}>{resetPasswordState.isLoading ? loader_text : 'Submit'}</Button>

                        {resetPasswordState.isError && <p className='formErrorText'>{resetPasswordState.data?.message}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default resetPassword
