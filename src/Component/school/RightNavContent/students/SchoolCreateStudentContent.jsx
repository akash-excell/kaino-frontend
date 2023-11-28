import React, { useEffect, useState } from 'react'
import styles from '@/styles/adminCreateSchool.module.css'
import { TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { useFormik } from 'formik';
import { dispatch } from '@/redux/store'
import { createStudentRequest, createStudentReset } from '@/redux/slices/school/createStudent'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { countries, loader_text } from '@/utils/constant'
import { FaHashtag } from 'react-icons/fa'
import Axios from '@/utils/axios'

function SchoolCreateStudentContent() {
  const createStudentState = useSelector(state => state.createStudent)
  const [errorMessages, setErrorMessages] = useState({})
  const [parents, setParents] = useState([])
  const router = useRouter()
  const [today] = useState(new Date().toISOString().split('T')[0]);

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      gender: 1,
      dob: "",
      id_no: "",
      class_id: 1,
      religion: 'Christian',
      email: '',
      address: '',
      parents_id: '',
      mobile_no: '',
      profile_img: ''
    },

    onSubmit: (values) => {
      const formData = new FormData()
      const restData = {
        religion: values.religion,
        id_no: values.id_no,
        class_id: values.class_id,
        address: values.address,
        parents_id: parseInt(values.parents_id)
      }
      const userData = {
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        gender: values.gender,
        dob: values.dob,
        mobile_no: values.mobile_no,
      }
      formData.append('member', JSON.stringify(restData))
      formData.append('user', JSON.stringify(userData))
      values.profile_img && formData.append('profile_img', values.profile_img)
      setErrorMessages({})
      dispatch(createStudentRequest(formData))
    }
  });

  useEffect(() => {
    if (createStudentState.isError && createStudentState.data?.message) {
      setErrorMessages(createStudentState.data?.message)
      dispatch(createStudentReset())
    }

  }, [createStudentState.isError])

  useEffect(() => {
    if (createStudentState.isSuccess) {
      formik.resetForm()
      router.push('/dashboard/school')
      dispatch(createStudentReset())
    }

  }, [createStudentState.isSuccess])

  const getParents = async () => {
    try {
      const response = await Axios.get('api/auth/all_parents/')
      setParents(response.data?.data)
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getParents()
  }, [])

  return (
    <>
      <div style={{ marginBottom: "2rem", display: 'flex', justifyContent: 'space-between', padding: "0 .5rem" }}>
        <p style={{ fontSize: '1.2rem', color: '#191919', fontWeight: '500' }}>Add Student</p>
        <p style={{ fontSize: "1rem", color: 'gray' }}><span style={{ color: "#191919", fontWeight: "500" }}>Student</span> / Add Student</p>
      </div>
      <div className={styles.formContainer}>
        <p className={styles.infoText}>Student Information</p>

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
                id="outlined-adornment-id"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><FaHashtag color='#191919' /></InputAdornment>,
                }}
                label="ID No"
                variant="outlined"
                name='id_no'
                onChange={formik.handleChange}
                value={formik.values.id_no}
              />
              {errorMessages?.id_no && <p className='formErrorText'>{errorMessages?.id_no[0]}</p>}
            </div>

            <FormControl size='small' focused required>
              <InputLabel id="demo-simple-select-label">Class</InputLabel>
              <Select
                id="outlined-adornment-class"
                label="Class"
                value={formik.values.class_id}
                onChange={formik.handleChange}
                name='class_id'
              >
                <MenuItem value={1}>{'K1'}</MenuItem>
                <MenuItem value={2}>{'K2'}</MenuItem>
                <MenuItem value={3}>{'K3'}</MenuItem>
              </Select>
              {errorMessages?.class_id && <p className='formErrorText'>{errorMessages?.class_id[0]}</p>}
            </FormControl>

            <FormControl size='small' focused required>
              <InputLabel id="demo-simple-select-label">Religion</InputLabel>
              <Select
                id="outlined-adornment-religion"
                label="Select Religion"
                value={formik.values.religion}
                onChange={formik.handleChange}
                name='religion'
              >
                <MenuItem value={'Christian'}>Christian</MenuItem>
                <MenuItem value={'Muslim'}>Islam</MenuItem>
                <MenuItem value={'Hindu'}>Hindu</MenuItem>
                <MenuItem value={'Buddhist'}>Buddhist</MenuItem>
                <MenuItem value={'Others'}>Others</MenuItem>
              </Select>
              {errorMessages?.religion && <p className='formErrorText'>{errorMessages?.religion[0]}</p>}
            </FormControl>

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

            <FormControl size='small' focused required>
              <InputLabel id="demo-simple-select-label">Select Parent Name</InputLabel>
              <Select
                id="outlined-adornment-parent"
                label="Parent Name"
                value={formik.values.parents_id}
                onChange={formik.handleChange}
                name='parents_id'
              >
                {
                  parents.map((item, i) => <MenuItem key={i} value={item?.id}>{item.first_name + " " + item.last_name + " " + item.mobile_no}</MenuItem>)
                }

              </Select>
              {errorMessages?.parents_id && <p className='formErrorText'>{errorMessages?.parents_id[0]}</p>}
            </FormControl>
            <div>
              <TextField
                sx={{ width: '100%' }}
                focused
                size='small'
                id="outlined-adornment-phone_No"
                InputProps={{
                  endAdornment: <InputAdornment position="start"><AiOutlinePhone color='#191919' /></InputAdornment>,
                }}
                label="Phone"
                variant="outlined"
                name='mobile_no'
                onChange={formik.handleChange}
                value={formik.values.mobile_no}
              />
              {errorMessages?.mobile_no && <p className='formErrorText'>{errorMessages?.mobile_no[0]}</p>}
            </div>

          </div>

          <div style={{ marginTop: ".8rem" }}>
            <p style={{ marginBottom: '1.5rem', color: "#444444", fontSize: '1rem', fontWeight: '600' }}>Upload Student Photo (150px * 150px)</p>
            <label className={styles.fileUpload}>
              {formik.values.profile_img ? 'Uploaded' : 'Choose File'}
              <input type='file' style={{ display: "none" }} name='profile_img' onChange={(event) => {
                formik.setFieldValue("profile_img", event.currentTarget.files[0]);
              }} />
            </label>
            {errorMessages?.profile_img && <p className='formErrorText'>{errorMessages?.profile_img[0]}</p>}

          </div>

          <div style={{ marginTop: "2rem" }}>
            <Button type='submit' variant='contained' sx={{ borderRadius: '6px', backgroundColor: "#5D79E6", width: "150px" }} disabled={createStudentState.isLoading}>
              {createStudentState.isLoading ? loader_text : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SchoolCreateStudentContent