import React, { useEffect, useState } from 'react'
import styles from '@/styles/adminCreateSchool.module.css'
import { TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { AiOutlineLink, AiOutlinePhone } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { useFormik } from 'formik';
import { dispatch } from '@/redux/store'
import { createSchoolRequest, createSchoolReset } from '@/redux/slices/admin/createSchool'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { countries, kaino_plans, loader_text } from '@/utils/constant'
import Axios from '@/utils/axios'

function AdminCreateSchoolContent() {
  const createSchoolState = useSelector(state => state.createSchool)
  const [termSystem, setTermSystem] = useState([])
  const [errorMessages, setErrorMessages] = useState({})
  const router = useRouter()
  const [today] = useState(new Date().toISOString().split('T')[0]);

  const formik = useFormik({
    initialValues: {
      name: '',
      year_established: '',
      motto: '',
      total_students: "",
      total_teachers: "",
      subscriptions: "KAINO_PLUS",
      term_system: 6,
      principal_name: '',
      phone: '',
      website_url: '',
      email: '',
      address: '',
      region: '',
      city: '',
      country: 'Tanzania',
      description: '',
      logo_img: ''
    },

    onSubmit: (values) => {
      const key = Object.keys(values)
      const formData = new FormData()
      key.map(item => formData.append(item, values[item]))
      setErrorMessages({})
      dispatch(createSchoolRequest(formData))
    }
  });

  useEffect(() => {
    if (createSchoolState.isError && createSchoolState.data?.message) {
      setErrorMessages(createSchoolState.data?.message)
      dispatch(createSchoolReset())
    }

  }, [createSchoolState.isError])

  useEffect(() => {
    if (createSchoolState.isSuccess) {
      formik.resetForm()
      router.push('/dashboard/admin')
      dispatch(createSchoolReset())
    }

  }, [createSchoolState.isSuccess])

  const getTermSytem = async () => {
    try {
      const data = await Axios.get('api/get_term/')
      if (data.data?.data) {
        setTermSystem(data.data?.data)
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getTermSytem()
  }, [])

  return (
    <>
      <div style={{ marginBottom: "2rem", display: 'flex', justifyContent: 'space-between', padding: "0 .5rem" }}>
        <p style={{ fontSize: '1.2rem', color: '#191919', fontWeight: '500' }}>Add School Information</p>
        <p style={{ fontSize: "1rem", color: 'gray' }}><span style={{ color: "#191919", fontWeight: "500" }}>School</span> / Add School Information</p>
      </div>
      <div className={styles.formContainer}>
        <p className={styles.infoText}>School Information</p>

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.formGrid}>
            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                id="outlined-adornment-schoolname"
                label="School Name"
                placeholder='Type here'
                variant="outlined"
                name='name'
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {errorMessages?.name && <p className='formErrorText'>{errorMessages?.name[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                id="outlined-adornment-year"
                label="Year of Etablishment"
                variant="outlined"
                type='date'
                name='year_established'
                onChange={formik.handleChange}
                value={formik.values.year_established}
                inputProps={{ max: today }}
              />
              {errorMessages?.year_established && <p className='formErrorText'>{errorMessages?.year_established[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                id="outlined-adornment-motto"
                label="Motto"
                placeholder='Type here'
                variant="outlined"
                name='motto'
                onChange={formik.handleChange}
                value={formik.values.motto}
              />
              {errorMessages?.motto && <p className='formErrorText'>{errorMessages?.motto[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                id="outlined-adornment-students"
                label="Total Students"
                variant="outlined"
                name='total_students'
                onChange={formik.handleChange}
                value={formik.values.total_students}
              />
              {errorMessages?.total_students && <p className='formErrorText'>{errorMessages?.total_students[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                size='small'
                id="outlined-adornment-teachers"
                label="Total Teachers"
                variant="outlined"
                name='total_teachers'
                onChange={formik.handleChange}
                value={formik.values.total_teachers}
              />
              {errorMessages?.total_teachers && <p className='formErrorText'>{errorMessages?.total_teachers[0]}</p>}
            </div>

            <FormControl size='small' focused required>
              <InputLabel id="demo-simple-select-label">Plans</InputLabel>
              <Select
                id="outlined-adornment-Plans"
                label="Plans"
                value={formik.values.subscriptions}
                onChange={formik.handleChange}
                name='subscriptions'
              >
                {kaino_plans.map((item, i) => <MenuItem key={i} value={item.value}>{item.name}</MenuItem>)}
              </Select>
              {errorMessages?.subscriptions && <p className='formErrorText'>{errorMessages?.subscriptions[0]}</p>}
            </FormControl>

            <FormControl size='small' focused required>
              <InputLabel id="demo-simple-select-label">Term System</InputLabel>
              <Select
                id="country-term_system"
                label="Term System"
                value={formik.values.term_system}
                onChange={formik.handleChange}
                name='term_system'
              >
                {
                  termSystem?.map((item, i) => <MenuItem key={i} value={item?.id}>{item?.term_name}</MenuItem>)
                }
              </Select>
              {errorMessages?.term_system && <p className='formErrorText'>{errorMessages?.term_system[0]}</p>}
            </FormControl>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                id="outlined-adornment-pricipal_name"
                label="Pricipal Name"
                variant="outlined"
                name='principal_name'
                onChange={formik.handleChange}
                value={formik.values.principal_name}
              />
              {errorMessages?.principal_name && <p className='formErrorText'>{errorMessages?.principal_name[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                id="outlined-adornment-phone_No"
                InputProps={{
                  endAdornment: <InputAdornment position="start"><AiOutlinePhone color='#191919' /></InputAdornment>,
                }}
                label="Phone"
                variant="outlined"
                name='phone'
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {errorMessages?.phone && <p className='formErrorText'>{errorMessages?.phone[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                id="outlined-adornment-weburl"
                InputProps={{
                  endAdornment: <InputAdornment position="start"><AiOutlineLink color='#191919' /></InputAdornment>,
                }}
                label="Website url"
                type='url'
                variant="outlined"
                name='website_url'
                onChange={formik.handleChange}
                value={formik.values.website_url}
              />
              {errorMessages?.address && <p className='formErrorText'>{errorMessages?.address[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                id="outlined-adornment-email"
                label="Email address"
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
                id="outlined-adornment-region"
                label="Region"
                variant="outlined"
                name='region'
                onChange={formik.handleChange}
                value={formik.values.region}
              />
              {errorMessages?.region && <p className='formErrorText'>{errorMessages?.region[0]}</p>}
            </div>

            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                required
                size='small'
                id="outlined-adornment-city"
                label="City"
                variant="outlined"
                name='city'
                onChange={formik.handleChange}
                value={formik.values.city}
              />
              {errorMessages?.city && <p className='formErrorText'>{errorMessages?.city[0]}</p>}
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
          <div style={{ marginTop: "1rem" }}>
            <TextField
              sx={{ width: '100%' }}
              focused
              required
              id="outlined-adornment-description"
              label="Brief Description"
              variant="outlined"
              name='description'
              multiline
              rows={4}
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            {errorMessages?.description && <p className='formErrorText'>{errorMessages?.description[0]}</p>}

          </div>
          <div style={{ marginTop: ".8rem" }}>
            <p style={{ marginBottom: '1.5rem', color: "#444444", fontSize: '1rem', fontWeight: '600' }}>Upload School Logo (150px * 150px)</p>
            <label className={styles.fileUpload}>
              {formik.values.logo_img ? 'Uploaded' : 'Choose File'}
              <input type='file' style={{ display: "none" }} name='logo_img' onChange={(event) => {
                formik.setFieldValue("logo_img", event.currentTarget.files[0]);
              }} />
            </label>
            {errorMessages?.logo_img && <p className='formErrorText'>{errorMessages?.logo_img[0]}</p>}

          </div>

          <div style={{ marginTop: "2rem" }}>
            <Button type='submit' variant='contained' sx={{ borderRadius: '6px', backgroundColor: "#5D79E6", width: "150px" }} disabled={createSchoolState.isLoading}>
              {createSchoolState.isLoading ? loader_text : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AdminCreateSchoolContent