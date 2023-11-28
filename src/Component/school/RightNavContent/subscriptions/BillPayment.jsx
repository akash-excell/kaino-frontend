import { Box, Button, Checkbox } from '@mui/material'
import { Input, Typography } from 'antd'
import React from 'react'

const BillPayment = () => {
  return (
    <div>
      <Box>
            <Typography
              variant="h6"
              sx={{ color: "black", fontWeight: "400", marginTop: "20px" }}
            >
              Billing Address
            </Typography>
            <Box
              sx={{
                background: "#FFFFFF",
                padding: "1rem",
                boxShadow: "3px 3px 3px 0px #f1e9e9",
                height: "200px",
                width: "550px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: "10px",
              }}
            >
              <Typography
                variant="p"
                sx={{
                  color: "black",
                  fontWeight: "300",

                  marginTop: "5px",
                }}
              >
                Country
              </Typography>
              <Input
                style={{
                  border: "1px solid #BB7696 ",
                  height: "35px",
                  backgroundColor: "white",
                  marginTop: "5px",
                }}
              />

              <Typography
                variant="p"
                sx={{ color: "black", fontWeight: "300", marginTop: "5px" }}
              >
                Region
              </Typography>
              <Input
                placeholder=""
                style={{
                  border: "1px solid #BB7696 ",
                  height: "35px",
                  backgroundColor: "white",
                  marginTop: "5px",
                }}
              />
              <Box
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "centre",
                }}
              ></Box>
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
                justifyContent:'center'
              }}
            >
              <Button
                sx={{
                  backgroundColor: "#F33A10",
                  color: "white",
                  fontWeight: "500",
                  marginRight: "10px",
                }}
              >
                Pay Now
              </Button>
              <Button
                sx={{
                  backgroundColor: "#F33A10",
                  color: "white",
                  fontWeight: "500",
                  marginRight: "10px",
                }}
              >
                Cancel
              </Button>
            </Box>
            <Box>
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "checkbox" }}
              />
              <Typography
                variant="p"
                sx={{ color: "black", fontWeight: "400" }}
              >
                I agree to{" "}
                <span style={{ color: "#F33A10" }}>kaino.africa </span>terms of
                use & <span style={{ color: "#F33A10" }}> privacy policy</span>
              </Typography>
            </Box>
          </Box>
    </div>
  )
}

export default BillPayment
