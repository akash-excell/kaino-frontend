import { getSingleInvoiceRequest, getSingleInvoiceReset } from '@/redux/slices/admin/getSingleInvoice'
import { dispatch } from '@/redux/store'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import InvoiceView from '../../Invoice/InvoiceView'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const AdminInvoiceViewContent = ({ id }) => {
    const [data, setData] = useState(null)
    const getSingleInvoiceState = useSelector(state => state.getSingleInvoice)

    useEffect(() => {
        if (id)
            dispatch(getSingleInvoiceRequest(id))
    }, [id])

    useEffect(() => {
        if (getSingleInvoiceState.isSuccess) {
            setData(getSingleInvoiceState.data?.data[0])
            dispatch(getSingleInvoiceReset())
        }
    }, [getSingleInvoiceState.isSuccess])

    const handleDownloadInvoice = () => {
        html2canvas(document.getElementById('invoice_container'))
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save(`kaino_${data?.invoice_number}.pdf`);
            });
    }

    return (
        <>

            <Box sx={{ background: '#fff', borderRadius: '10px' }}>
                {
                    data ? <InvoiceView data={data} /> : <Typography variant='body1' sx={{ fontSize: '1.5rem', textAlign: 'center' }}>Please wait....</Typography>
                }

            </Box>
            {/* {data && <Box sx={{ padding: "1rem 0" }}><Button onClick={handleDownloadInvoice} variant='contained' sx={{ marginTop: "1rem" }} size='large'>Download</Button></Box>} */}
        </>
    )
}

export default AdminInvoiceViewContent
