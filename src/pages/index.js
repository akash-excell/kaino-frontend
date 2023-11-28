import React, { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import { Button, Checkbox, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai'
import Link from 'next/link'
import { dispatch } from '@/redux/store'
import { loginRequest, loginReset } from '@/redux/slices/login'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { getRole, loader_text } from '@/utils/constant'
import { useRouter } from 'next/router'
import TwoFactorModal from '@/Component/admin/Modal/TwoFactorModal'
import jwtDecode from 'jwt-decode'

const login = () => {

    const loginState = useSelector(state => state.login)

    const [isRemember, setIsRemember] = useState(false)
    const [isModal, setIsModal] = useState(false)

    const router = useRouter()

    const validationSchema = yup.object({
        username: yup.string().required('Enter your username'),
        password: yup.string().required('Password is required')

    })

    const formHandler = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const payload = {
                ...values,
                remember_me: isRemember ? 1 : 0
            }

            dispatch(loginRequest(payload))
        }
    })

    useEffect(() => {
        if (loginState.isSuccess) {
            if (loginState.data?.data?.is_two_factor === 1) {
                dispatch(loginReset())
                setIsModal(true)
            }
            else {
                localStorage.setItem('token', loginState.data?.data?.access)
                const decoded = jwtDecode(loginState.data?.data?.access)
                const role = getRole(decoded?.role)
                if (role === 'Admin')
                    router.push('/dashboard/admin')
                else if (role === 'School Admin')
                    router.push('/dashboard/school')
                dispatch(loginReset())
            }
        }
    }, [loginState.isSuccess])

    return (
        <>
            <TwoFactorModal isModal={isModal} setIsModal={setIsModal} data={formHandler.values} />
            <div className={styles.mainDiv}>
                <div className={styles.inner_div}>
                    <div className={styles.leftDiv}>
                        <div className={styles.imageDiv}>
                            <Image src={"/images/circleImage.png"} width={130} height={130} alt='circle' /><Image src={"/images/dottedImage.png"} width={130} height={130} alt='circle' />
                        </div>

                    </div>

                    <div className={styles.rightDiv}>
                        <div style={{ marginBottom: "1rem" }}>
                            <h2>Welcome to</h2>
                            <h1 style={{ marginBottom: "1.5rem" }}>KAINO</h1>
                            <h2>Sign in</h2>
                        </div>

                        <form onSubmit={formHandler.handleSubmit}>

                            <FormControl fullWidth sx={{ my: 1 }} focused size='small'>
                                <InputLabel required>Username</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-username"
                                    endAdornment={<InputAdornment position="end"><AiOutlineUser color='#891B55' /></InputAdornment>}
                                    label="Username"
                                    type='text'
                                    name='username'
                                    value={formHandler.values.username}
                                    onChange={formHandler.handleChange}
                                />
                            </FormControl>

                            {formHandler.touched.username && formHandler.errors.username && <p className='formErrorText'>{formHandler.errors.username}</p>}

                            <FormControl fullWidth sx={{ my: 1 }} focused size='small'>
                                <InputLabel required>Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    endAdornment={<InputAdornment position="end"><AiOutlineLock color='#891B55' /></InputAdornment>}
                                    label="Password"
                                    type='password'
                                    name='password'
                                    value={formHandler.values.password}
                                    onChange={formHandler.handleChange}
                                />
                            </FormControl>

                            {formHandler.touched.password && formHandler.errors.password && <p className='formErrorText'>{formHandler.errors.password}</p>}
                            <div className={styles.requestDiv}>
                                <div className={styles.rememberText}><Checkbox sx={{ padding: 0, color: '#e3e0e0' }}
                                    onChange={(e) => setIsRemember(e.target.checked)}
                                    checked={isRemember}
                                />Remember me</div>
                                <Link href={'/requestAccess'} className={styles.access}>Request Access ?</Link>
                            </div>

                            <Button type='submit' fullWidth variant='contained' sx={{ backgroundColor: '#3D5EE1', boxShadow: 'none' }}
                                disabled={loginState.isLoading}
                            >{loginState.isLoading ? loader_text : 'Login'}</Button>

                            {loginState.isError && <p className='formErrorText'>{loginState.data?.message?.non_field_errors || loginState.data?.message}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default login
