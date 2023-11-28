import React, { useEffect, useState } from 'react'
import styles from '@/styles/adminCreateSchool.module.css'
import { TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { AiFillLock, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { useFormik } from 'formik';
import { dispatch } from '@/redux/store'
import { createParentRequest, createParentReset } from '@/redux/slices/school/createParent'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { countries, loader_text } from '@/utils/constant'
import { BsBagCheck } from 'react-icons/bs'
import { FaIdCard } from 'react-icons/fa'
import * as yup from 'yup'

function SchoolCreateParentContent() {
  const createParentState = useSelector(state => state.createParent)
  const [errorMessages, setErrorMessages] = useState({})
  const router = useRouter()
  const [today] = useState(new Date().toISOString().split('T')[0]);

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      gender: 1,
      dob: "",
      occupation: "",
      nin: '',
      email: '',
      address: '',
      profile_img: '',
      city: '',
      region: '',
      country: 'Uganda',
      mobile_no: '',
      username: '',
      password: '',
      confirm_password: ''
    },
    validationSchema: yup.object({
      username: yup.string()
        .required('Enter Username')
        .matches(/^\w+$/, 'Username must be alphanumeric')
      ,
      password: yup.string().required('Enter your new password')
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
      ,
      confirm_password: yup.string().required('Confirm your new password')
        .oneOf([yup.ref('password')], 'Confirm password and new password must be same')
    }),

    onSubmit: (values) => {
      const formData = new FormData()

      const restData = {
        occupation: values.occupation,
        nin: values.nin,
        address: values.address,
        city: values.city,
        region: values.region,
        country: values.country,
      }

      const userData = {
        username: values.username,
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        gender: values.gender,
        dob: values.dob,
        mobile_no: values.mobile_no
      }

      formData.append('member', JSON.stringify(restData))
      formData.append('user', JSON.stringify(userData))
      values.profile_img && formData.append('profile_img', values.profile_img)
      setErrorMessages({})
      dispatch(createParentRequest(formData))
    }
  });

  useEffect(() => {
    if (createParentState.isError && createParentState.data?.message) {
      setErrorMessages(createParentState.data?.message)
      dispatch(createParentReset())
    }

  }, [createParentState.isError])

  useEffect(() => {
    if (createParentState.isSuccess) {
      formik.resetForm()
      router.push('/dashboard/school')
      dispatch(createParentReset())
    }

  }, [createParentState.isSuccess])

  return (
    <>
      <div style={{ marginBottom: "2rem", display: 'flex', justifyContent: 'space-between', padding: "0 .5rem" }}>
        <p style={{ fontSize: '1.2rem', color: '#191919', fontWeight: '500' }}>Add Parent</p>
        <p style={{ fontSize: "1rem", color: 'gray' }}><span style={{ color: "#191919", fontWeight: "500" }}>Parent</span> / Add Parent</p>
      </div>
      <div className={styles.formContainer}>
        <p className={styles.infoText}>Parent Information</p>

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.formGrid}>
            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                id="outlined-adornment-first_name"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><AiOutlineUser color='#191919' /></InputAdornment>,
                }}
                label="First Name"
                placeholder='Type here'
                variant="outlined"
                name='first_name'
                onChange={formik.handleChange}
                value={formik.values.first_name}
              />
              {errorMessages?.first_name && <p className='formErrorText'>{errorMessages?.first_name[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                id="outlined-adornment-last_name"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><AiOutlineUser color='#191919' /></InputAdornment>,
                }}
                label="Last Name"
                placeholder='Type here'
                variant="outlined"
                name='last_name'
                onChange={formik.handleChange}
                value={formik.values.last_name}
              />
              {errorMessages?.last_name && <p className='formErrorText'>{errorMessages?.last_name[0]}</p>}
            </div>

            <FormControl size='small' focused required>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                id="outlined-adornment-gender"
                label="Gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                name='gender'
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
              </Select>
              {errorMessages?.gender && <p className='formErrorText'>{errorMessages?.gender[0]}</p>}
            </FormControl>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                type='date'
                id="outlined-adornment-dob"
                label="Date Of Birth"
                variant="outlined"
                inputProps={{ max: today }}
                name='dob'
                onChange={formik.handleChange}
                value={formik.values.dob}
              />
              {errorMessages?.dob && <p className='formErrorText'>{errorMessages?.dob[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                size='small'
                id="outlined-adornment-phone_No"
                required
                InputProps={{
                  endAdornment: <InputAdornment position="start"><AiOutlinePhone color='#191919' /></InputAdornment>,
                }}
                label="Mobile"
                variant="outlined"
                name='mobile_no'
                onChange={formik.handleChange}
                value={formik.values.mobile_no}
              />
              {errorMessages?.mobile_no && <p className='formErrorText'>{errorMessages?.mobile_no[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                size='small'
                required
                id="outlined-adornment-id"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><BsBagCheck color='#191919' /></InputAdornment>,
                }}
                label="Occupation"
                variant="outlined"
                name='occupation'
                onChange={formik.handleChange}
                value={formik.values.occupation}
              />
              {errorMessages?.occupation && <p className='formErrorText'>{errorMessages?.occupation[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                id="outlined-adornment-nin"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><FaIdCard color='#191919' /></InputAdornment>,
                }}
                label="NIN"
                variant="outlined"
                name='nin'
                onChange={formik.handleChange}
                value={formik.values.nin}
              />
              {errorMessages?.nin && <p className='formErrorText'>{errorMessages?.nin[0]}</p>}
            </div>

          </div>

          <p className={styles.infoText} style={{ marginTop: '2rem' }}>Login Details</p>
          <div className={styles.formGrid}>
            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                id="outlined-adornment-username"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><AiOutlineUser color='#191919' /></InputAdornment>,
                }}
                label="Username"
                variant="outlined"
                name='username'
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {errorMessages?.username && <p className='formErrorText'>{errorMessages?.username[0]}</p>}
              {formik.touched.username && formik.errors.username && <p className='formErrorText'>{formik.errors.username}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                type='email'
                id="outlined-adornment-email"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><AiOutlineMail color='#191919' /></InputAdornment>,
                }}
                label="Email"
                variant="outlined"
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {errorMessages?.email && <p className='formErrorText'>{errorMessages?.email[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                type='password'
                id="outlined-adornment-password"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><AiFillLock color='#191919' /></InputAdornment>,
                }}
                label="Password"
                variant="outlined"
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {errorMessages?.password && <p className='formErrorText'>{errorMessages?.password[0]}</p>}
              {formik.touched.password && formik.errors.password && <p className='formErrorText'>{formik.errors.password}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                type='password'
                id="outlined-adornment-confirm_password"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><AiFillLock color='#191919' /></InputAdornment>,
                }}
                label="Confirm Password"
                variant="outlined"
                name='confirm_password'
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
              />
              {errorMessages?.confirm_password && <p className='formErrorText'>{errorMessages?.confirm_password[0]}</p>}
              {formik.touched.confirm_password && formik.errors.confirm_password && <p className='formErrorText'>{formik.errors.confirm_password}</p>}
            </div>

          </div>

          <p className={styles.infoText} style={{ marginTop: '2rem' }}>Address</p>
          <div className={styles.formGrid}>
            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                id="outlined-adornment-address"
                InputProps={{
                  endAdornment: <InputAdornment position="start"><GoLocation color='#191919' /></InputAdornment>,
                }}
                label="Address"
                variant="outlined"
                name='address'
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              {errorMessages?.address && <p className='formErrorText'>{errorMessages?.address[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                size='small'
                required
                id="outlined-adornment-city"
                label="City"
                variant="outlined"
                name='city'
                onChange={formik.handleChange}
                value={formik.values.city}
              />
              {errorMessages?.city && <p className='formErrorText'>{errorMessages?.city[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                size='small'
                required
                id="outlined-adornment-region"
                label="Region"
                variant="outlined"
                name='region'
                onChange={formik.handleChange}
                value={formik.values.region}
              />
              {errorMessages?.region && <p className='formErrorText'>{errorMessages?.region[0]}</p>}
            </div>


            <FormControl size='small' focused required>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                id="country-select"
                label="Country"
                name='country'
                value={formik.values.country}
                onChange={formik.handleChange}
              >
                {countries.map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
              </Select>
              {errorMessages?.country && <p className='formErrorText'>{errorMessages?.country[0]}</p>}
            </FormControl>

          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <p style={{ marginBottom: '1.5rem', color: "#444444", fontSize: '1rem', fontWeight: '600' }}>Upload Parent Photo (150px * 150px)</p>
            <label className={styles.fileUpload}>
              {formik.values.profile_img ? 'Uploaded' : 'Choose File'}
              <input type='file' style={{ display: "none" }} name='profile_img' onChange={(event) => {
                formik.setFieldValue("profile_img", event.currentTarget.files[0]);
              }} />
            </label>
            {errorMessages?.profile_img && <p className='formErrorText'>{errorMessages?.profile_img[0]}</p>}

          </div>
          <div style={{ marginTop: "2rem" }}>
            <Button type='submit' variant='contained' sx={{ borderRadius: '6px', backgroundColor: "#5D79E6", width: "150px" }} disabled={createParentState.isLoading}>
              {createParentState.isLoading ? loader_text : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SchoolCreateParentContent