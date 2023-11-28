import React, { useEffect, useState } from 'react'
import styles from '@/styles/adminCreateSchool.module.css'
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { createTermSystemRequest, createTermSystemReset } from '@/redux/slices/admin/createTermSystem'
import { dispatch } from '@/redux/store'
import { countries } from '@/utils/constant'
import * as yup from 'yup'

function AdminTermSystemContent() {
  const createTermSystemState = useSelector(state => state.createTermSystem)
  const [errorMessages, setErrorMessages] = useState({})
  const router = useRouter()
  const [today] = useState(new Date().toISOString().split('T')[0]);

  const initialValues = {
    term_start_date: "",
    mid_term_break: "",
    term_end_date: "",
    term_name: '',
    country: "Kenya",
    academic_term: "3",
    academic_year: "2023",
    weeks: "16",
    months: "4",
    exam_start_date: "",
    exam_end_date: "",
    other_events: "Sport Day",
    end_start_date: "",
  };

  const formHandler = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      term_start_date: yup.date()
        .min(today, 'Term Start Date must be a future date')
        .required('Term Start Date is required'),
      mid_term_break: yup.date()
        .min(yup.ref('term_start_date'), 'Mid Term Break must be greater than Term Start Date')
        .required('Mid Term Break is required'),
      term_end_date: yup.date()
        .min(yup.ref('mid_term_break'), 'Term End Date must be greater than Mid Term Break')
        .required('Term End Date is required'),
    }),
    onSubmit: (values) => {
      setErrorMessages({})
      const filteredPayload = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== "")
      );
      dispatch(createTermSystemRequest(filteredPayload))
    }
  })


  useEffect(() => {
    if (createTermSystemState.isError && createTermSystemState.data?.message) {
      setErrorMessages(createTermSystemState.data?.message)
      dispatch(createTermSystemReset())
    }

  }, [createTermSystemState.isError])

  useEffect(() => {
    if (createTermSystemState.isSuccess) {
      formHandler.resetForm()
      router.push('/dashboard/admin')
      dispatch(createTermSystemReset())
    }

  }, [createTermSystemState.isSuccess])


  return (
    <>
      <div style={{ marginBottom: "2rem", display: 'flex', justifyContent: 'space-between', padding: "0 .5rem" }}>
        <p style={{ fontSize: '1.2rem', color: '#191919', fontWeight: '500' }}>Create Term</p>
        <p style={{ fontSize: "1rem", color: 'gray' }}><span style={{ color: "#191919", fontWeight: "500" }}>Term</span> / Add Term Information</p>
      </div>
      <div className={styles.formContainer}>
        <p className={styles.infoText}>Basic details</p>
        <form onSubmit={formHandler.handleSubmit}>
          <div className={styles.formGrid}>
            <div>
              <TextField
                focused
                sx={{ width: '100%' }}
                required
                size='small'
                id="outlined-adornment-term-date"
                label="Term Start Date"
                variant="outlined"
                type='date'
                name='term_start_date'
                onChange={formHandler.handleChange}
                value={formHandler.values.term_start_date}
                inputProps={{ min: today }}
              />
              {
                formHandler.errors.term_start_date && <p className='formErrorText'>{formHandler.errors.term_start_date}</p>
              }
              {errorMessages?.term_start_date && <p className='formErrorText'>{errorMessages?.term_start_date[0]}</p>}
            </div>

            <div>
              <TextField
                focused
                sx={{ width: '100%' }}
                required
                size='small'
                id="outlined-adornment-midterm-break"
                label="Mid Term Break"
                variant="outlined"
                type='date'
                name='mid_term_break'
                onChange={formHandler.handleChange}
                value={formHandler.values.mid_term_break}
                inputProps={{ min: formHandler.values.term_start_date }}
              />
              {
                formHandler.errors.mid_term_break && <p className='formErrorText'>{formHandler.errors.mid_term_break}</p>
              }
              {errorMessages?.mid_term_break && <p className='formErrorText'>{errorMessages?.mid_term_break[0]}</p>}
            </div>

            <div>
              <TextField
                focused
                sx={{ width: '100%' }}
                required
                size='small'
                id="outlined-adornment-termend-date"
                label="Term End Date"
                variant="outlined"
                type='date'
                name='term_end_date'
                onChange={formHandler.handleChange}
                value={formHandler.values.term_end_date}
                inputProps={{ min: formHandler.values.mid_term_break }}
              />
              {
                formHandler.errors.term_end_date && <p className='formErrorText'>{formHandler.errors.term_end_date}</p>
              }
              {errorMessages?.term_end_date && <p className='formErrorText'>{errorMessages?.term_end_date[0]}</p>}
            </div>

            <div>
              <TextField
                focused
                sx={{ width: '100%' }}
                required
                size='small'
                id="country-term_system"
                label="Term Name"
                variant="outlined"
                name='term_name'
                onChange={formHandler.handleChange}
                value={formHandler.values.term_name}
              />
              {errorMessages?.term_name && <p className='formErrorText'>{errorMessages?.term_name[0]}</p>}
            </div>

            <FormControl size='small' focused
              sx={{ width: '100%' }}
              required>
              <InputLabel >Country</InputLabel>
              <Select
                id="country-select"
                label="Country"
                onChange={formHandler.handleChange}
                value={formHandler.values.country}
                name='country'
                required
              >
                {countries.map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
              </Select>
              {errorMessages?.country && <p className='formErrorText'>{errorMessages?.country[0]}</p>}
            </FormControl>

            <FormControl size='small' focused
              sx={{ width: '100%' }}
              required>
              <InputLabel >Academic Terms</InputLabel>
              <Select
                id="academic-terms-select"
                label="Academic Terms"
                name='academic_term'
                onChange={formHandler.handleChange}
                value={formHandler.values.academic_term}
                required
              >
                <MenuItem value={'1'}>One</MenuItem>
                <MenuItem value={'2'}>Two</MenuItem>
                <MenuItem value={'3'}>Three</MenuItem>
              </Select>
              {errorMessages?.academic_term && <p className='formErrorText'>{errorMessages?.academic_term[0]}</p>}
            </FormControl>


            <FormControl size='small' focused
              sx={{ width: '100%' }}
              required>
              <InputLabel >Academic Year</InputLabel>
              <Select
                id="academic-year-select"
                label="Academic Year"
                onChange={formHandler.handleChange}
                value={formHandler.values.academic_year}
                name='academic_year'
                required
              >
                <MenuItem value={'2021'}>2021</MenuItem>
                <MenuItem value={'2022'}>2022</MenuItem>
                <MenuItem value={'2023'}>2023</MenuItem>
              </Select>
              {errorMessages?.academic_year && <p className='formErrorText'>{errorMessages?.academic_year[0]}</p>}
            </FormControl>

            <FormControl size='small' focused
              sx={{ width: '100%' }}
              required>
              <InputLabel >Weeks</InputLabel>
              <Select
                id="academic-weeks-select"
                label="Weeks"
                onChange={formHandler.handleChange}
                value={formHandler.values.weeks}
                name='weeks'
                required
              >
                <MenuItem value={'15'}>15</MenuItem>
                <MenuItem value={'16'}>16</MenuItem>
                <MenuItem value={'17'}>17</MenuItem>
              </Select>
              {errorMessages?.weeks && <p className='formErrorText'>{errorMessages?.weeks[0]}</p>}
            </FormControl>

            <FormControl size='small' focused
              sx={{ width: '100%' }}
              required>
              <InputLabel >Months</InputLabel>
              <Select
                id="academic-months-select"
                label="Months"
                onChange={formHandler.handleChange}
                value={formHandler.values.months}
                name='months'
                required
              >
                <MenuItem value={'3'}>3</MenuItem>
                <MenuItem value={'4'}>4</MenuItem>
                <MenuItem value={'5'}>5</MenuItem>
              </Select>
              {errorMessages?.months && <p className='formErrorText'>{errorMessages?.months[0]}</p>}
            </FormControl>

            <div>
              <TextField
                focused
                sx={{ width: '100%' }}

                size='small'
                id="outlined-adornment-examstart-date"
                label="Exam Start Date"
                variant="outlined"
                type='date'
                name='exam_start_date'
                onChange={formHandler.handleChange}
                value={formHandler.values.exam_start_date}
              />
              {errorMessages?.exam_start_date && <p className='formErrorText'>{errorMessages?.exam_start_date[0]}</p>}
            </div>

            <div>
              <TextField
                focused
                sx={{ width: '100%' }}

                size='small'
                id="outlined-adornment-examend-date"
                label="Exam End Date"
                variant="outlined"
                type='date'
                name='exam_end_date'
                onChange={formHandler.handleChange}
                value={formHandler.values.exam_end_date}
              />
              {errorMessages?.exam_end_date && <p className='formErrorText'>{errorMessages?.exam_end_date[0]}</p>}
            </div>

          </div>
          <div style={{ marginTop: "1rem", fontWeight: "500", fontSize: '1.3rem' }}>
            <p>Other Relevant Information</p>
          </div>
          <div className={styles.formGrid} style={{ margin: "2rem 0" }}>
            <FormControl size='small' focused
              sx={{ width: '100%' }}
            >
              <InputLabel >Other Events</InputLabel>
              <Select
                id="other_events-select"
                label="Other Events"
                onChange={formHandler.handleChange}
                value={formHandler.values.other_events}
                name='other_events'
              >
                <MenuItem value={'Sport Day'}>Sport Day</MenuItem>
              </Select>
              {errorMessages?.other_events && <p className='formErrorText'>{errorMessages?.other_events[0]}</p>}
            </FormControl>

            <div>
              <TextField
                focused
                sx={{ width: '100%' }}

                size='small'
                id="outlined-adornment-endstart-date"
                label="End Start Date"
                variant="outlined"
                type='date'
                name='end_start_date'
                onChange={formHandler.handleChange}
                value={formHandler.values.end_start_date}
              />
              {errorMessages?.end_start_date && <p className='formErrorText'>{errorMessages?.end_start_date[0]}</p>}
            </div>

          </div>
          <div style={{ marginTop: "1rem" }}>
            <Button disabled={createTermSystemState.isLoading} type='submit' variant='contained' sx={{ borderRadius: '6px', backgroundColor: "#5D79E6", width: "150px" }}>
              {createTermSystemState.isLoading ? 'Please wait...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AdminTermSystemContent