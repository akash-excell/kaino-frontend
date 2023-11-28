import { Box, Typography } from '@mui/material'
import React from 'react'
import InvoicePreviewTable from '../Table/InvoicePreviewTable'

const InvoiceView = ({ data }) => {
    return (
        <Box sx={{ padding: 4 }} id="invoice_container">
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant='body1'
                        sx={{ paddingLeft: '4px', color: '#8C225A', fontSize: '3rem', fontWeight: '700', letterSpacing: '3px' }}
                    >
                        KAINO
                    </Typography>

                    <Typography variant='h5' sx={{ marginTop: 1, fontSize: '1.7rem', fontWeight: '600' }}>
                        INVOICE
                    </Typography>

                    <Typography variant='body1' sx={{ marginTop: 1, fontSize: '1.4rem', fontWeight: '500' }}>
                        Invoice Number : {data?.invoice_number}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='h5' sx={{ fontSize: '1.6rem', fontWeight: '700' }}>
                        Invoice From
                    </Typography>
                    <Typography variant='body1' sx={{ marginTop: 2, fontSize: '1.2rem', fontWeight: '600' }}>
                        Kaino Africa
                    </Typography>
                    {/* <Typography variant='body1' sx={{ fontSize: '1rem' }}>
                        +22736473877
                    </Typography> */}
                    <Typography variant='body1' sx={{ fontSize: '1rem', maxWidth: '220px' }}>
                        {data?.invoice_from}
                    </Typography>
                    {/* <Typography variant='body1' sx={{ fontSize: '1rem' }}>
                        zip code ,City - Country
                    </Typography> */}
                </Box>
            </Box>
            <hr style={{ height: '1px' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <Box>
                    <Typography variant='h5' sx={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        Billed to
                    </Typography>
                    <Typography variant='body1' sx={{ marginTop: 2, fontSize: '1.2rem', fontWeight: '600' }}>
                        {data?.organization_name}
                    </Typography>
                    <Typography variant='body1' sx={{ marginTop: 2, fontSize: '1rem' }}>
                        +22736473877
                    </Typography>
                    {data?.invoice_to && <Typography variant='body1' sx={{ fontSize: '1rem', maxWidth: '220px' }}>
                        {data?.invoice_to}
                    </Typography>}

                    {/* <Typography variant='body1' sx={{ fontSize: '1rem' }}>
                        Address line 2
                    </Typography>
                    <Typography variant='body1' sx={{ fontSize: '1rem' }}>
                        zip code ,City - Country
                    </Typography> */}
                </Box>
                <Box sx={{ paddingRight: 4 }}>
                    <Typography variant='h5' sx={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        Payment Details
                    </Typography>
                    <Typography variant='body1' sx={{ marginTop: 2, fontSize: '1rem' }}>
                        Debit Card
                    </Typography>
                    <Typography variant='body1' sx={{ fontSize: '1rem', marginTop: 1 }}>
                        XXXXXXXXXX-2541
                    </Typography>
                    <Typography variant='body1' sx={{ fontSize: '1rem', marginTop: 1 }}>
                        HDFC BANK
                    </Typography>
                    <Box sx={{ marginTop: 3, padding: 1, background: '#F7F7FF' }}>
                        <Typography variant='body1' sx={{ fontSize: '1rem' }}>
                            Recurring : 15 Months
                        </Typography>
                        <Typography variant='body1' sx={{ fontSize: '1rem', marginTop: 1 }}>
                            PO Number : {data?.po_number}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: 3,
                    minHeight: '80px',
                    background: '#891B55',
                    color: '#fff',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                <Typography variant='body1' sx={{ fontWeight: '600' }}>
                    Issue Date: {data?.created_date}
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: '600' }}>
                    Due Date: {data?.due_date}
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: '600' }}>
                    Due Amount : ${data?.status !== 'Paid' ? data?.total_amount : 0}
                </Typography>
            </Box>
            <Box sx={{ marginTop: 3 }}>
                <InvoicePreviewTable data={data?.items} />
            </Box>
            <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant='h5' sx={{ fontSize: '1.2rem', fontWeight: '700' }}>
                        Notes:
                    </Typography>
                    <Typography variant='body1' sx={{ marginTop: 2 }}>
                        Enter customer notes or any other details
                    </Typography>

                    <Typography variant='h5' sx={{ marginTop: 2, fontSize: '1.2rem', fontWeight: '700' }}>
                        Terms and Conditions:
                    </Typography>
                    <Typography variant='body1' sx={{ marginTop: 2 }}>
                        Enter customer notes or any other details
                    </Typography>
                </Box>
                <Box
                    sx={{
                        minHeight: '200px',
                        minWidth: '400px',
                        border: '2px solid #ededed',
                        borderRadius: '4px',
                        padding: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='body1'>
                            Taxable
                        </Typography>
                        <Typography variant='body1'>
                            $ {data?.total_amount}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='body1'>
                            Additional Charges
                        </Typography>
                        <Typography variant='body1'>
                            $ 0
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='body1'>
                            Discount
                        </Typography>
                        <Typography variant='body1'>
                            $0
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='body1'>
                            Sub total
                        </Typography>
                        <Typography variant='body1'>
                            ${data?.total_amount}
                        </Typography>
                    </Box>
                    <hr style={{ height: '1px' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#4968E3' }}>
                        <Typography variant='h5' sx={{ fontWeight: '700' }}>
                            Total
                        </Typography>
                        <Typography variant='h5' sx={{ fontWeight: '700' }}>
                            $ {data?.total_amount}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                <Box>
                    {
                        data?.sign_img && <img src={data?.sign_img} alt="signature" height={'80px'} width={'300px'} />
                    }

                    <Typography variant='body1' sx={{ marginTop: 2 }}>
                        {data?.name_of_signee}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default InvoiceView
