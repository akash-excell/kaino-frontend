import React, { useMemo, useRef } from 'react'
import styles from '@/styles/adminFinance.module.css'
import Link from 'next/link'
import { Box, Button, Typography } from '@mui/material'
import { FormControl, Select, MenuItem, TextField } from '@mui/material'
import { useState } from 'react'
import ItemsInvoiceTable from '../../Table/ItemsInvoiceTable'
import { AiFillCreditCard } from 'react-icons/ai'
import { Switch } from 'antd'
import { useRouter } from 'next/router'
import PreviewInvoiceModal from '../../Modal/PreviewInvoiceModal'
import InvoiceView from '../../Invoice/InvoiceView'
import { useEffect } from 'react'
import { dispatch } from '@/redux/store'
import { preInvoiceRequest, preInvoiceReset } from '@/redux/slices/admin/preInvoice'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { createInvoiceRequest, createInvoiceReset } from '@/redux/slices/admin/createInvoice'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { getSingleInvoiceRequest, getSingleInvoiceReset } from '@/redux/slices/admin/getSingleInvoice'
import { deleteInvoiceRequest, deleteInvoiceReset } from '@/redux/slices/admin/deleteInvoice'
import { updateInvoiceRequest, updateInvoiceReset } from '@/redux/slices/admin/updateInvoice'

const AdminNewInvoiceContent = ({ id }) => {
    const imageRef = useRef()
    const router = useRouter()
    const preInvoiceState = useSelector(state => state.preInvoice)
    const getSingleInvoiceState = useSelector(state => state.getSingleInvoice)
    const createInvoiceState = useSelector(state => state.createInvoice)
    const deleteInvoiceState = useSelector(state => state.deleteInvoice)
    const updateInvoiceState = useSelector(state => state.updateInvoice)
    const [invoiceDetails, setInvoiceDetails] = useState({})
    const [invoiceItems, setInvoiceItems] = useState([{
        id: 1,
        item_name: 'Subscription',
        plan: 'KAINO_PLUS',
        quantity: 1,
        price: '',
        amount: '',
        discount: 0,
    }])
    const [isEdit, setIsEdit] = useState(false)
    const [isEditInvoice, setIsEditInvoice] = useState(false)
    const [isDraft, setIsDraft] = useState(false)
    const [invoiceTo, setInvoiceTo] = useState('')
    const [signature, setSignature] = useState(null)
    const [roundedValue, setRoundedValue] = useState(0)
    const [taxableValue, setTaxableValue] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [previewData, setPreviewData] = useState({})
    const [invoiceFrom, setInvoiceFrom] = useState({
        id: '',
        mobile_no: "",
        address: "",
        zip_code: ""
    })
    const [open, setOpen] = useState(false);
    const [isRound, setIsRound] = useState(false)
    const [todayDate, setTodayDate] = useState(moment().format('DD/MM/YYYY'))

    const formik = useFormik({
        initialValues: {
            organization: '',
            po_number: '',
            due_date: '',
            name_of_signee: '',
        },
        validationSchema: yup.object({
            organization: yup.string()
                .required('Organization is required'),
            po_number: yup.string()
                .required('Po number is required'),
            due_date: yup.string()
                .required('Due date is required'),
            name_of_signee: yup.string()
                .required('Name of signee is required'),
        }),
        onSubmit: (values) => {
            const invoiceOrg =
            {
                ...values,
                invoice_number: invoiceDetails?.invoice_number,
                invoice_from: invoiceFrom.address,
                is_draft: isDraft ? 1 : 0
            }

            const itemData = []
            invoiceItems.map(item => {
                const { id, price, amount, ...others } = item
                itemData.push(others)
            })

            const formData = new FormData()
            if (signature)
                formData.append('sign_img', signature)
            formData.append('item', JSON.stringify(itemData))
            formData.append('invoice', JSON.stringify(invoiceOrg))
            if (isEditInvoice)
                dispatch(updateInvoiceRequest(formData, parseInt(id)))
            else
                dispatch(createInvoiceRequest(formData))
        }
    })

    useMemo(() => {

        const newData = [...invoiceItems]
        let totalAmount = 0
        newData.map(item => {
            const totalDiscount = (item.amount * item.discount) / 100
            const priceAfterDiscount = item.amount - totalDiscount
            totalAmount = totalAmount + priceAfterDiscount
        })
        setTaxableValue(totalAmount)
        const roundOffed = isRound ? parseInt(totalAmount) : totalAmount
        setRoundedValue(isRound ? Number((totalAmount % 1).toFixed(2)) : 0)
        setTotalAmount(roundOffed)

    }, [invoiceItems, isRound])

    useEffect(() => {
        if (id) {
            dispatch(getSingleInvoiceRequest(id))
            setIsEditInvoice(true)
        }
        else
            dispatch(preInvoiceRequest())
    }, [id])

    useEffect(() => {
        if (!isEditInvoice) {
            if (preInvoiceState.isSuccess) {
                setInvoiceDetails(preInvoiceState.data?.data)
                setInvoiceFrom(preInvoiceState.data?.data?.invoice_from)
                dispatch(preInvoiceReset())
            }
        }
    }, [preInvoiceState.isSuccess])

    const convertImageUrlToFile = async (imageUrl) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'sign', { type: blob.type });
        setSignature(file)
    }


    useEffect(() => {
        if (getSingleInvoiceState.isSuccess) {
            const invoiceData = getSingleInvoiceState.data?.data[0]
            if (invoiceData) {
                setInvoiceDetails(invoiceData)
                formik.setFieldValue('po_number', invoiceData?.po_number)
                formik.setFieldValue('due_date', invoiceData?.due_date)
                formik.setFieldValue('name_of_signee', invoiceData?.name_of_signee)
                formik.setFieldValue('organization', invoiceData?.organization)
                setInvoiceFrom(old => {
                    return {
                        ...old,
                        'address': invoiceData?.invoice_from
                    }
                })
                setInvoiceTo(old => {
                    return {
                        ...old,
                        'name': invoiceData?.invoice_to
                    }
                })
                setTodayDate(invoiceData?.created_date)
                if (invoiceData?.items)
                    setInvoiceItems(invoiceData?.items)
                convertImageUrlToFile(invoiceData?.sign_img)
                dispatch(getSingleInvoiceReset())
            }
        }
    }, [getSingleInvoiceState.isSuccess])

    useEffect(() => {
        if (createInvoiceState.isSuccess) {
            dispatch(createInvoiceReset())
            router.push('/dashboard/admin/all-invoices')
        }
    }, [createInvoiceState.isSuccess])

    useEffect(() => {
        if (updateInvoiceState.isSuccess) {
            dispatch(updateInvoiceReset())
            router.push('/dashboard/admin/all-invoices')
        }
    }, [updateInvoiceState.isSuccess])

    useEffect(() => {
        if (deleteInvoiceState.isSuccess) {
            dispatch(deleteInvoiceReset())
            router.push('/dashboard/admin/all-invoices')
        }
    }, [deleteInvoiceState.isSuccess])

    const handleFileChange = (e) => {
        const files = e.target.files[0]
        if (files) {
            setSignature(files)
        }
    }

    const handlePreview = () => {
        const previewData = {
            invoice_number: invoiceDetails?.invoice_number,
            invoice_from: invoiceFrom.address,
            invoice_to: invoiceTo?.address ? invoiceTo?.address + " " + invoiceTo?.city + " " + invoiceTo?.country : '',
            po_number: formik.values.po_number,
            created_date: todayDate,
            due_date: formik.values.due_date,
            sign_img: signature ? URL.createObjectURL(signature) : null,
            name_of_signee: formik.values.name_of_signee,
            organization_name: invoiceTo?.name,
            total_amount: totalAmount,
            status: 'Draft',
            items: invoiceItems
        }
        setPreviewData(previewData)
        setOpen(true)
    }

    return (
        <div>
            <div className={styles.invoice_page_Btn}>
                <div className={styles.rightButtonContainer}>
                    <Link className={styles.linkText} href={'/dashboard/admin/finances'}><div className={styles.backtoCircle} />Back to Invoice List</Link>

                    <Button variant='primary' onClick={() => handlePreview()} className={styles.linkText} sx={{ textTransform: 'capitalize' }}>Preview</Button>

                    <Button variant='contained' sx={{ background: '#4c6ae3', color: '#fff', fontWeight: '500' }} size='large'
                        disabled={!isEditInvoice}
                        onClick={() => dispatch(deleteInvoiceRequest(parseInt(id)))}
                    >
                        {deleteInvoiceState.isLoading ? 'Please wait...' : 'Delete Invoice'}
                    </Button>

                    <Button
                        variant='contained'
                        sx={{ background: '#4c6ae3', color: '#fff', fontWeight: '500' }}
                        size='large'
                        onClick={() => {
                            setIsDraft(true)
                            formik.handleSubmit()
                        }}
                    >
                        {isDraft && createInvoiceState.isLoading || updateInvoiceState.isLoading ? 'Please wait..' : 'Save Draft'}
                    </Button>
                </div>
            </div>
            <form className={styles.invoice_create_Container} onSubmit={formik.handleSubmit}>
                <div className={styles.invoice_details}>
                    <div>
                        {
                            isEditInvoice ?
                                <TextField
                                    sx={{ width: '100%' }}
                                    focused
                                    size='small'
                                    label='Customer'
                                    value={invoiceDetails?.organization_name}
                                    variant="outlined"
                                />
                                : <FormControl focused fullWidth size='small'>
                                    <p style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '10px' }}>Customer Name</p>
                                    <Select
                                        labelId="customer-label"
                                        id="customer"
                                        name='organization'
                                        value={formik.values.organization}
                                        onChange={(e) => {
                                            formik.setFieldValue('organization', parseInt(e.target.value))
                                            setInvoiceTo(invoiceDetails?.invoice_to?.find(item => item.id == e.target.value))
                                        }}
                                    >
                                        {
                                            invoiceDetails?.invoice_to?.map(({ id, name }, i) => <MenuItem key={i} value={id}>{name}</MenuItem>)
                                        }
                                    </Select>
                                    {
                                        formik.errors.organization && formik.touched.organization && <p className='formErrorText'>{formik.errors.organization}</p>
                                    }
                                </FormControl>
                        }
                        <Box sx={{ marginTop: 2 }}>
                            <p style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '10px' }}>PO Number</p>
                            <TextField
                                sx={{ width: '100%' }}
                                focused
                                size='small'
                                type='number'
                                name='po_number'
                                value={formik.values.po_number}
                                placeholder='Enter Reference Number'
                                variant="outlined"
                                onChange={formik.handleChange}
                            />
                            {
                                formik.errors.po_number && formik.touched.po_number && <p className='formErrorText'>{formik.errors.po_number}</p>
                            }
                        </Box>
                    </div>
                    <div>
                        <p style={{ fontWeight: '700', fontSize: '1rem' }}>Invoice details</p>
                        <div className={styles.invoice_details_right}>
                            <Box sx={{ borderBottom: '1px solid #dcdada' }} className={styles.invoice_details_right_div}>
                                <p style={{ fontSize: '1rem', fontWeight: '700' }}>Invoice No <span style={{ color: '#4e6ce0' }}>{invoiceDetails?.invoice_number}</span></p>
                            </Box>
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                <Box sx={{ borderRight: '1px solid #dcdada' }} className={styles.invoice_details_right_div}>
                                    <p style={{ fontSize: '1rem', fontWeight: '700' }}>Date <span style={{ color: '#4e6ce0' }}>
                                        {todayDate}
                                    </span></p>
                                </Box>
                                <Box className={styles.invoice_details_right_div}>
                                    <div style={{ fontSize: '1rem', fontWeight: '700' }}>Due Date <span style={{ color: '#4e6ce0', cursor: "pointer" }}>
                                        <TextField
                                            type='date'
                                            focused
                                            sx={{ marginTop: 1 }}
                                            size='small'
                                            name='due_date'
                                            value={formik.values.due_date}
                                            onChange={formik.handleChange}
                                        />
                                        {
                                            formik.errors.due_date && formik.touched.due_date && <p className='formErrorText'>{formik.errors.due_date}</p>
                                        }
                                    </span>
                                    </div>
                                </Box>
                            </Box>
                        </div>
                    </div>
                </div>

                <hr style={{ height: '1px' }} />

                <Box sx={{ marginTop: 2 }} className={styles.invoice_details}>
                    <div>

                        <p className={styles.from_toText}>Invoice From
                            <span style={{ color: '#4e6ce0', marginLeft: '2px', fontSize: '.8rem', fontWeight: '700', cursor: 'pointer' }} onClick={() => setIsEdit(isEdit ? false : true)}>{
                                isEdit ? 'Save' : 'Edit Address'
                            }</span>
                        </p>

                        <Box sx={{ marginTop: 1 }} className={styles.address}>
                            {invoiceFrom.mobile_no && <p>{invoiceFrom.mobile_no}</p>}
                            {
                                isEdit ?
                                    <TextField
                                        placeholder='Enter address'
                                        name='address'
                                        fullWidth
                                        value={invoiceFrom.address}
                                        label='Address'
                                        focused
                                        size='small'
                                        onChange={(e) => setInvoiceFrom(old => {
                                            return {
                                                ...old,
                                                'address': e.target.value
                                            }
                                        })}
                                    />
                                    : <p>{invoiceFrom.address}</p>
                            }
                            {invoiceFrom.zip_code && <p>{invoiceFrom.zip_code}</p>}
                        </Box>
                    </div>
                    <div>
                        <p className={styles.from_toText}>Invoice To</p>
                        {
                            invoiceTo && <Box sx={{ marginTop: 1 }} className={styles.address}>
                                <p>{invoiceTo?.name}</p>
                                {invoiceTo?.address && <p>{invoiceTo?.address}</p>}
                                {invoiceTo?.city && <p>{invoiceTo?.city + " " + invoiceTo?.country}</p>}
                            </Box>
                        }
                    </div>
                </Box>
                <Box sx={{ marginTop: 4 }}>
                    <p style={{ color: '#617CE6', fontSize: '1.2rem', fontWeight: '700' }}>Items Details</p>
                    <Box sx={{ marginTop: 2 }}>
                        <ItemsInvoiceTable data={invoiceItems} setData={setInvoiceItems} />
                    </Box>
                </Box>
                <div className={styles.invoiceBottom}>
                    <div className={styles.invoiceBottom_left}>
                        <h4>More Fields</h4>
                        <div className={styles.paymentDetailsBox}>
                            <h5 style={{ fontSize: '1rem' }}>Payment details</h5>
                            <Box sx={{ marginTop: 1, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className={styles.cardBox}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <p>Debit Card</p>
                                    <p>XXXXXXXXXXXX-</p>
                                    <p>2541 Dena Bank</p>
                                </Box>
                                <AiFillCreditCard color='#fff' size={'2rem'} />
                            </Box>
                        </div>
                        <div>
                            <TextField
                                sx={{ width: '100%', marginTop: 1 }}
                                focused
                                size='small'
                                variant="outlined"
                                name='terms'
                                placeholder='Add Terms & Conditions'
                            />
                            <TextField
                                sx={{ width: '100%', marginTop: 1 }}
                                focused
                                size='small'
                                variant="outlined"
                                name='notes'
                                placeholder='Add Notes'
                            />
                        </div>
                    </div>
                    <div className={styles.invoiceBottom_right}>
                        <h4>Summary</h4>
                        <div className={styles.summaryDetailsBox}>
                            <Box sx={{ marginTop: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontSize: '1rem', fontWeight: '500' }}>Taxable Amount</p>
                                <p style={{ fontSize: '1rem', fontWeight: '700' }}>${taxableValue}</p>
                            </Box>

                            <Box sx={{ marginTop: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                <p style={{ fontSize: '1rem', fontWeight: '500' }}>Round off<span style={{ marginLeft: '8px' }}>
                                    <Switch size="small" checked={isRound} onChange={(values) => setIsRound(values)} /></span></p>
                                <p style={{ fontSize: '1rem', fontWeight: '700' }}>${roundedValue}</p>
                            </Box>

                            <Box sx={{ paddingLeft: 1, marginTop: 2 }}>
                                <Typography variant='body1' sx={{ color: '#3556dc', fontWeight: '600', fontSize: '.8rem', cursor: 'pointer' }}>Addition Charges</Typography>
                                <Typography variant='body1' sx={{ color: '#3556dc', fontWeight: '600', fontSize: '.8rem', cursor: 'pointer', marginTop: 1 }}>Add More Discount</Typography>
                            </Box>

                            <hr style={{ height: '1px' }} />
                            <Box sx={{ marginTop: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#3556dc' }}>Total Amount</p>
                                <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#3556dc' }}>${totalAmount}</p>
                            </Box>

                        </div>
                        <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'flex-end', flexDirection: 'column', gap: 2 }}>
                            <div className={styles.fileUpload}>
                                {
                                    signature ? <Box className={styles.uploadedImage} sx={{ backgroundImage: `url(${URL.createObjectURL(signature)})` }} onClick={() => {
                                        imageRef.current.click()
                                    }}>
                                        <input ref={imageRef} type='file' style={{ display: "none" }} name='logo_img' accept='.png, .jpg, .jpeg' onChange={handleFileChange} />
                                    </Box>
                                        : <label className={styles.labelFont}>Upload Sign
                                            <input type='file' style={{ display: "none" }} name='logo_img' accept='.png, .jpg, .jpeg' onChange={handleFileChange} />
                                        </label>
                                }
                            </div>
                            <Box sx={{ width: '80%' }}>
                                <TextField
                                    sx={{ width: '100%', marginTop: 1 }}
                                    focused
                                    variant="outlined"
                                    name='name_of_signee'
                                    size='small'
                                    value={formik.values.name_of_signee}
                                    onChange={formik.handleChange}
                                    placeholder='Name Of Signatory'
                                />
                                {
                                    formik.errors.name_of_signee && formik.touched.name_of_signee && <p className='formErrorText'>{formik.errors.name_of_signee}</p>
                                }
                            </Box>
                            <Button
                                disabled={createInvoiceState.isLoading}
                                variant='contained'
                                size='large'
                                sx={{ marginTop: 1, background: '#4c6ae3' }}
                                type='submit'
                                onClick={() => setIsDraft(false)}
                            >
                                {!isDraft && createInvoiceState.isLoading || updateInvoiceState.isLoading ? 'Please wait..' : 'Save Invoice'}
                            </Button>
                        </Box>
                    </div>
                </div>
            </form>
            {open && <PreviewInvoiceModal open={open} setOpen={setOpen} >
                <InvoiceView data={previewData} />
            </PreviewInvoiceModal>}
        </div>
    )
}

export default AdminNewInvoiceContent
