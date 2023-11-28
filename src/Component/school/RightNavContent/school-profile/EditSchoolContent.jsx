import { getSchoolProfileRequest, getSchoolProfileReset } from '@/redux/slices/school/getSchoolProfile'
import { dispatch } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styles from '@/styles/adminCreateSchool.module.css'
import { TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { AiOutlineLink, AiOutlinePhone } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { useFormik } from 'formik';
import { countries, loader_text } from '@/utils/constant'
import { updateSchoolProfileRequest, updateSchoolProfileReset } from '@/redux/slices/school/updateSchoolProfile'
import { toast } from 'react-toastify'

function EditSchoolContent() {
  const [errorMessages, setErrorMessages] = useState({})
  const router = useRouter()
  const getSchoolProfileState = useSelector(state => state.getSchoolProfile)
  const updateSchoolProfileState = useSelector(state => state.updateSchoolProfile)
  const [today] = useState(new Date().toISOString().split('T')[0]);

  const formik = useFormik({
    initialValues: {
      name: '',
      year_established: '',
      motto: '',
      total_students: "",
      total_teachers: "",
      principal_name: '',
      phone: '',
      website_url: '',
      email: '',
      address: '',
      region: '',
      city: '',
      country: '',
      description: '',
      logo_img: ''
    },

    onSubmit: (values) => {
      const key = Object.keys(values)
      const formData = new FormData()
      key.map(item => formData.append(item, values[item]))
      setErrorMessages({})
      dispatch(updateSchoolProfileRequest(formData))
    }
  });

  useEffect(() => {
    dispatch(getSchoolProfileRequest())
  }, [])

  useEffect(() => {
    if (getSchoolProfileState.isSuccess) {
      const data = getSchoolProfileState.data?.data
      const { logo_img, ...otherValues } = formik.initialValues
      const values = Object.keys(otherValues)
      values.map(item => {
        formik.setFieldValue(item, data[item])
      })

      dispatch(getSchoolProfileReset())
    }
  }, [getSchoolProfileState.isSuccess])

  useEffect(() => {
    if (updateSchoolProfileState.isSuccess) {
      dispatch(updateSchoolProfileReset())
      toast.success('Updated')
      router.push('/dashboard/school/school-profile')
    }
  }, [updateSchoolProfileState.isSuccess])

  return (
    <div>
      <div style={{ marginBottom: "2rem", display: 'flex', justifyContent: 'space-between', padding: "0 .5rem" }}>
        <p style={{ fontSize: '1.2rem', color: '#191919', fontWeight: '500' }}>Edit School Information</p>
        <p style={{ fontSize: "1rem", color: 'gray' }}><span style={{ color: "#191919", fontWeight: "500" }}>School</span> / Edit School Information</p>
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
            <Button type='submit' variant='contained' sx={{ borderRadius: '6px', backgroundColor: "#5D79E6", width: "150px" }} disabled={updateSchoolProfileState.isLoading}>
              {updateSchoolProfileState.isLoading ? loader_text : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditSchoolContent