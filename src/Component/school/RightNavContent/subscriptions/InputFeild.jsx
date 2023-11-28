
import { Box } from '@mui/system'
import { Input } from 'antd/es'
import React from 'react'

const InputFeild = ({text}) => {
  return (
    <Box sx={{width:'100%'}}>
        <Input
                      placeholder={text}
                      style={{
                        border: "1px solid #BB7696 ",
                        height: "35px",
                        
                        marginTop: "5px",
                        backgroundColor: "white",
                        marginRight: "2%",
                      }}
                    />
      
    </Box>
  )
}

export default InputFeild
