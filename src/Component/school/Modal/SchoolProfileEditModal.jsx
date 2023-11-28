import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import styles from '@/styles/adminUserRoles.module.css'
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { dispatch } from '@/redux/store'
import { updateSchoolPersonalRequest, updateSchoolPersonalReset } from '@/redux/slices/school/updateSchoolPersonal'
import { toast } from 'react-toastify'
import { getSchoolDataRequest } from '@/redux/slices/school/getSchoolData'
import { countries } from '@/utils/constant'

export default function SchoolProfileEditModal({ setIsModal, isModal, editData }) {
    const updateSchoolPersonalState = useSelector(state => state.updateSchoolPersonal)
    const [errorMessages, setErrorMessages] = useState({})

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            dob: '',
            mobile_no: '',
            address: {
                street: "",
                city: "",
                district: "",
                region: "",
                zip_code: "",
                country: ""
            }

        },
        onSubmit: (values) => {
            setErrorMessages({})
            dispatch(updateSchoolPersonalRequest(values))
        }
    })

    useEffect(() => {
        formik.setValues(editData)
    }, [])

    useEffect(() => {
        if (updateSchoolPersonalState.isSuccess) {
            toast.success('Updated')
            dispatch(updateSchoolPersonalReset())
            dispatch(getSchoolDataRequest())
            setIsModal(false)
        }
    }, [updateSchoolPersonalState.isSuccess])

    useEffect(() => {
        if (updateSchoolPersonalState.isError && updateSchoolPersonalState.data?.message) {
            setErrorMessages(updateSchoolPersonalState.data?.message)
            dispatch(updateSchoolPersonalReset())
        }

    }, [updateSchoolPersonalState.isError])

    return (
        <Modal
            title="Edit Personal"
            width={'900px'}
            centered
            open={isModal}
            onCancel={() => setIsModal(false)}
            footer={null}
        >
            <form onSubmit={formik.handleSubmit}>
                <Typography sx={{ fontWeight: '600', marginTop: '1rem' }} variant='h6'>
                    Information
                </Typography>
                <div className={styles.modalForm}>
                    <div>
                        <TextField
                            focused
                            sx={{ width: "100%" }}
                            required
                            size='small'
                            id="outlined-adornment-first_name"
                            label="First Name"
                            placeholder='First Name'
                            variant="outlined"
                            name='first_name'
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                        />
                        {errorMessages?.first_name && <p className='formErrorText'>{errorMessages?.first_name[0]}</p>}
                    </div>

                    <div>
                        <TextField
                            focused
                            sx={{ width: "100%" }}
                            required
                            size='small'
                            id="outlined-adornment-last_name"
                            label="Last Name"
                            placeholder='Last Name'
                            variant="outlined"
                            name='last_name'
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                        />
                        {errorMessages?.last_name && <p className='formErrorText'>{errorMessages?.last_name[0]}</p>}

                    </div>

                    <div>
                        <TextField
                            focused
                            sx={{ width: "100%" }}
                            required
                            type='email'
                            size='small'
                            id="outlined-adornment-email"
                            label="Email"
                            placeholder='Email'
                            variant="outlined"
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {errorMessages?.email && <p className='formErrorText'>{errorMessages?.email[0]}</p>}
                    </div>

                    <div>
                        <TextField
                            focused
                            sx={{ width: "100%" }}
                            required
                            type='date'
                            size='small'
                            id="outlined-adornment-dob"
                            label="Date of Birth"
                            placeholder='Date of Birth'
                            variant="outlined"
                            name='dob'
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                        />
                        {errorMessages?.dob && <p className='formErrorText'>{errorMessages?.dob[0]}</p>}
                    </div>

                    <div>
                        <TextField
                            focused
                            sx={{ width: "100%" }}
                            required
                            size='small'
                            id="outlined-adornment-mobile_no"
                            label="Phone No"
                            placeholder='Phone No'
                            variant="outlined"
                            name='mobile_no'
                            value={formik.values.mobile_no}
                            onChange={formik.handleChange}
                        />
                        {errorMessages?.mobile_no && <p className='formErrorText'>{errorMessages?.mobile_no[0]}</p>}
                    </div>

                </div>

                <Typography sx={{ fontWeight: '600', marginTop: '1rem' }} variant='h6'>
                    Address
                </Typography>
                <div className={styles.modalForm}>

                    <div>
                        <TextField
                            focused
                            sx={{ width: "100%" }}
                            required
                            size='small'
                            id="outlined-adornment-street"
                            label="Street"
                            placeholder='Street'
                            variant="outlined"
                            name='address[street]'
                            value={formik.values.address.street}
                            onChange={formik.handleChange}
                        />
                        {errorMessages?.street && <p className='formErrorText'>{errorMessages?.street[0]}</p>}
                    </div>

                    <div>
                        <TextField
                            focused
                            sx={{ width: "100%" }}
                            required
                            size='small'
                            id="outlined-adornment-city"
                            label="City"
                            placeholder='City'
                            variant="outlined"
                            name='address[city]'
                            value={formik.values.address.city}
                            onChange={formik.handleChange}
                        />
                        {errorMessages?.city && <p className='formErrorText'>{errorMessages?.city[0]}</p>}
                    </div>

                    <div>
                        <TextField
                            focused
                            sx={{ width: "100%" }}
                            required
                            size='small'
                            id="outlined-adornment-district"
                            label="District"
                            placeholder='District'
                            variant="outlined"
                            name='address[district]'
                            value={formik.values.address.district}
                            onChange={formik.handleChange}
                        />
                        {errorMessages?.district && <p className='formErrorText'>{errorMessages?.district[0]}</p>}
                    </div>

                    <div>
                        <TextField
                            focused
                            sx={{ width: "100%" }}
                            required
                            size='small'
                            id="outlined-adornment-region"
                            label="Region"
                            placeholder='Region'
                            variant="outlined"
                            name='address[region]'
                            value={formik.values.address.region}
                            onChange={formik.handleChange}
                        />
                        {errorMessages?.region && <p className='formErrorText'>{errorMessages?.region[0]}</p>}
                    </div>

                    <div>
                        <TextField
                            focused
                            sx={{ width: "100%" }}
                            required
                            size='small'
                            id="outlined-adornment-zip_code"
                            label="Zip code"
                            placeholder='Zip Code'
                            variant="outlined"
                            name='address[zip_code]'
                            value={formik.values.address.zip_code}
                            onChange={formik.handleChange}
                        />
                        {errorMessages?.zip_code && <p className='formErrorText'>{errorMessages?.zip_code[0]}</p>}
                    </div>

                    <FormControl size='small' focused required>
                        <InputLabel id="demo-simple-select-label">Country</InputLabel>
                        <Select
                            id="country-select"
                            label="Country"
                            name='address[country]'
                            value={formik.values.address.country}
                            onChange={formik.handleChange}
                        >
                            {countries.map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
                        </Select>
                        {errorMessages?.country && <p className='formErrorText'>{errorMessages?.country[0]}</p>}
                    </FormControl>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <div className={styles.modalBtnContainer}>
                        <Button variant='outlined' onClick={() => setIsModal(false)}>Cancel</Button>
                        <Button type='submit' variant='contained' style={{ background: "#7367F0" }}
                            disabled={updateSchoolPersonalState.isLoading}>{updateSchoolPersonalState.isLoading ? 'Please wait...' : 'Submit'}</Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
