import React from 'react'
import styles from '@/styles/Home.module.css'
import stylesRequest from '@/styles/RequestAccess.module.css'
import Image from 'next/image'
import { Button, InputAdornment, TextField } from '@mui/material'
import { AiOutlineMail } from 'react-icons/ai'
import Link from 'next/link'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { EMAIL_REGX, loader_text } from '@/utils/constant'
import { dispatch } from '@/redux/store'
import { requestAccess, requestAccessReset } from '@/redux/slices/requestAccess'
import { useSelector } from 'react-redux'
import AlertMessage from '@/Component/Generic/AlertMessage'

const RequestAccess = () => {

    const requestAccessState = useSelector(state => state.requestAccess)

    const validationSchema = yup.object({
        email: yup.string().required('Enter your email')
            .matches(EMAIL_REGX, 'Enter a valid email address')

    })

    const formHandler = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(requestAccess(values))
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
                        <h2>Request Access</h2>
                        <h5 className={stylesRequest.helpText}>Let Us Help You</h5>
                    </div>
                    <form onSubmit={formHandler.handleSubmit}>

                        {requestAccessState.isSuccess && <AlertMessage type='success' message={requestAccessState.data?.message} handler={() => dispatch(requestAccessReset())} />}

                        <TextField
                            focused
                            size='small'
                            fullWidth
                            id="outlined-adornment-email"
                            label="Enter your registered email address"
                            variant="outlined"
                            sx={{ marginBottom: '0.5rem' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="start"><AiOutlineMail color='#891B55' /></InputAdornment>,
                            }}
                            type='text'
                            name='email'
                            value={formHandler.values.email}
                            onChange={formHandler.handleChange}
                        />

                        {formHandler.errors.email && <p className='formErrorText'>{formHandler.errors.email}</p>}

                        <Button className={stylesRequest.requestButton} type='submit' fullWidth variant='contained' sx={{ backgroundColor: '#3D5EE1', marginBottom: "1.5rem", boxShadow: 'none' }} disabled={requestAccessState.isLoading}>{requestAccessState.isLoading ? loader_text : 'Send Request'}</Button>

                        {requestAccessState.isError && <p className='formErrorText'>{requestAccessState.data?.message}</p>}

                        <Link href="/">
                            <Button className={stylesRequest.loginButton} fullWidth variant="contained" sx={{ backgroundColor: '#18AEFA', boxShadow: 'none' }}>Login</Button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RequestAccess
