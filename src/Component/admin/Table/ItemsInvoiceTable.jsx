import { kaino_plans } from '@/utils/constant';
import { Box, TextField, InputAdornment, FormControl, Select, MenuItem } from '@mui/material';
import { Table } from 'antd';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiCopy } from 'react-icons/bi';

const ItemsInvoiceTable = ({ data, setData }) => {

    const handlePlus = () => {
        const lastIndex = data.length - 1
        const newdata = [...data]
        const lastData = newdata[lastIndex]
        const newId = lastData.id + 1
        newdata.push(
            {
                id: newId,
                item_name: 'Subscription',
                plan: 'KAINO_PLUS',
                quantity: 1,
                price: '',
                amount: '',
                discount: 0,
            }
        )
        setData(newdata)
    }

    const handleDeleteRow = ({ id }) => {
        let newdata = [...data]
        newdata = newdata.filter(item => item.id !== id)
        setData(newdata)
    }

    const handleCopy = (items) => {
        const lastIndex = data.length - 1
        const newdata = [...data]
        const lastData = newdata[lastIndex]
        const newId = lastData.id + 1
        let toCopiedItem = { ...items }
        toCopiedItem.id = newId
        newdata.push(toCopiedItem)
        setData(newdata)
    }

    const handleChange = (e, items) => {
        const name = e.target.name
        const value = e.target.value
        const copiedItems = { ...items }
        copiedItems[name] = parseInt(value) ? parseInt(value) : value
        copiedItems.amount = copiedItems.price * copiedItems.quantity

        let newData = [...data]
        const index = newData.findIndex(item => item.id == copiedItems.id)
        newData[index] = copiedItems
        setData(newData)
    }

    const columns = [
        {
            title: 'Items',
            render: (item) => (
                <TextField
                    sx={{ width: '100%', background: '#fff' }}
                    focused
                    required
                    size='small'
                    placeholder='Item Name'
                    variant="outlined"
                    name='item_name'
                    value={item.item_name}
                />
            ),
        },
        {
            title: 'Category',
            render: (item) => (
                <FormControl focused fullWidth size='small'>
                    <Select
                        labelId="category_id"
                        id="category"
                        name='plan'
                        value={item.plan}
                        onChange={(e) => handleChange(e, item)}
                        required
                    >
                        {
                            kaino_plans.map(({ name, value }, i) => <MenuItem key={i} value={value}>{name}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            ),
        },
        {
            title: 'Quantity',
            render: (item) => (
                <TextField
                    sx={{ width: '100%', background: '#fff' }}
                    focused
                    required
                    size='small'
                    type='number'
                    variant="outlined"
                    onChange={(e) => handleChange(e, item)}
                    name='quantity'
                    value={item.quantity}
                />
            ),
        },
        {
            title: 'Price',
            render: (item) => (
                <TextField
                    sx={{ width: '100%', background: '#fff' }}
                    focused
                    size='small'
                    type='number'
                    variant="outlined"
                    onChange={(e) => handleChange(e, item)}
                    name='price'
                    value={item.price}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
            ),
        },
        {
            title: 'Amount',
            render: (item) => (
                <TextField
                    sx={{ width: '100%', background: '#fff' }}
                    focused
                    size='small'
                    type='number'
                    variant="outlined"
                    onChange={(e) => handleChange(e, item)}
                    name='amount'
                    value={item.amount}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
            ),
        },
        {
            title: 'Discount',
            render: (item) => (
                <TextField
                    sx={{ width: '100%', background: '#fff' }}
                    focused
                    size='small'
                    type='number'
                    variant="outlined"
                    onChange={(e) => {
                        const value = parseFloat(e.target.value)
                        if (value >= 0 && value <= 100) {
                            handleChange(e, item)
                        }
                        else {
                            e.target.value = ""
                            handleChange(e, item)
                        }
                    }}
                    name='discount'
                    value={item.discount}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                        min: 0,
                        max: 100
                    }}
                />
            ),
        }, {
            title: 'Items',
            render: (item) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AiOutlinePlusCircle color='#869BEC' size={'1.4rem'} onClick={() => handlePlus()} />
                    <BiCopy color='grey' size={'1.4rem'} onClick={() => handleCopy(item)} />
                    {
                        data.length > 1 && <AiOutlineDelete color='red' size={'1.4rem'} onClick={() => handleDeleteRow(item)} />
                    }
                </Box>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    );
};

export default ItemsInvoiceTable;
