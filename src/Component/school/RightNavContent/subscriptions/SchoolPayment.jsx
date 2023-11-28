import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import styles from "@/styles/adminDashboardContent.module.css";
import React, { useState } from "react";
import { BiMobileAlt } from "react-icons/bi";
import InputFeild from "./InputFeild";

const SchoolPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState("Mobile Money");
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box>
          <Typography
          className={styles.headingcontainer}
           variant="h6" sx={{ fontWeight: "100" }}>
            Order Summary
          </Typography>
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                columnGap: "1rem",
                "@media (max-width:1095px)": { gridTemplateColumns: "1fr 1fr" },
                "@media (max-width:800px)": {
                  gridTemplateColumns: "1fr",
                  rowGap: "1rem",
                },
              }}
            >
              <Box
                className={styles.boxcontainer}
                sx={{ height: "150px", width: "350px" }}
              >
                <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
                  <Box
                    sx={{
                      background: "#8B0000 !important",
                      width: "40%",
                      height: "80%",
                      marginRight: "1.5rem",
                    }}
                  >
                    <Typography></Typography>
                  </Box>
                  <Box className={styles.totalTextContainer}>
                    <Typography className={styles.headingcontainer} variant="p">
                      Monthly Subscription
                    </Typography>
                    <Typography
                      className={styles.headingcontainer}
                      variant="p"
                      sx={{ fontWeight: "500" }}
                    >
                      $36
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ marginTop: "auto", paddingTop: "1rem" }}>
                    <Typography variant="span" sx={{ color: "black" }}>
                      Billed Today (USD)
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "auto", paddingTop: "1rem" }}>
                    <Typography variant="span" sx={{ color: "black" }}>
                      $36
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Typography
          className={styles.headingcontainer}
            variant="h6"
            sx={{fontWeight: "100", marginTop: "50px" }}
          >
            Account Information
          </Typography>
          <Typography
          className={styles.headingcontainer}
            variant="p"
            sx={{ fontWeight: "100", marginTop: "20%" }}
          >
            Required
          </Typography>

          <Box
            className={styles.boxcontainer}
            sx={{
              height: "280px",
              width: "550px",
            }}
          >
            <form style={{ width: "100%" }}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "5px",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "48%",
                    }}
                  >
                    <Typography
                      className={styles.headingcontainer}
                      variant="p"
                      sx={{ fontWeight: "100" }}
                    >
                      First Name
                    </Typography>
                    <Box>
                      <InputFeild text="FirstName" />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "48%",
                    }}
                  >
                    <Typography
                      className={styles.headingcontainer}
                      variant="p"
                      sx={{
                        fontWeight: "100",
                      }}
                    >
                      Last Name
                    </Typography>
                    <Box>
                      <InputFeild text="LastName" />
                    </Box>
                  </Box>
                </Box>

                <Typography
                  className={styles.headingcontainer}
                  variant="p"
                  sx={{ fontWeight: "100" }}
                >
                  Email Address
                </Typography>
                <InputFeild text="email" />

                <Typography
                  className={styles.headingcontainer}
                  variant="p"
                  sx={{
                    fontWeight: "100",
                    marginBottom: "100px",
                    marginTop: "10px",
                  }}
                >
                  Telephone
                </Typography>
                <InputFeild text="+27" />

                <Box>
                  <Checkbox
                    color="primary"
                    inputProps={{ "aria-label": "checkbox" }}
                  />
                  <Typography
                    className={styles.headingcontainer}
                    variant="span"
                    sx={{ fontWeight: "100", marginTop: "5px" }}
                  >
                    I agree to email instructional emails
                  </Typography>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
        <Box>
          <Typography
            className={styles.headingcontainer}
            variant="h6"
            sx={{ fontWeight: "100" }}
          >
            Payment Information
          </Typography>
          <Typography
            className={styles.headingcontainer}
            variant="p"
            sx={{ fontWeight: "100", marginBottom: "20%" }}
          >
            This is secured by Flutterwave payment
          </Typography>
          <Box
            className={styles.boxcontainer}
            sx={{
              height: "240px",
              width: "550px",
              marginTop: "5px",
            }}
          >
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              style={{ width: "100%" }}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
              value={paymentMethod}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FormControlLabel
                  value="Mobile Money"
                  control={<Radio />}
                  style={{ color: "black" }}
                  label="Mobile Money"
                />{" "}
                <BiMobileAlt style={{ color: "black" }} />
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FormControlLabel
                  value=" Credit card"
                  control={<Radio />}
                  style={{ color: "black" }}
                  label="Credit card"
                />{" "}
                <BiMobileAlt style={{ color: "black" }} />
              </Box>
            </RadioGroup>
            {paymentMethod == "Mobile Money" ? (
              <>
                <Typography
                  className={styles.headingcontainer}
                  variant="span"
                  sx={{ marginTop: "10px", fontWeight: "400" }}
                >
                  Enter your Phone Number
                </Typography>

                <InputFeild text="+27" />
              </>
            ) : (
              <>
                <Typography
                  className={styles.headingcontainer}
                  variant="span"
                  sx={{ marginTop: "10px" }}
                >
                  Card Number
                </Typography>
                <InputFeild />
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "10px",
                    alignContent: "centre",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "48%",
                    }}
                  >
                    <Typography
                      className={styles.headingcontainer}
                      variant="span"
                      sx={{
                        marginTop: "5px",
                      }}
                    >
                      Expiration Date
                    </Typography>

                    <InputFeild />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "48%",
                    }}
                  >
                    <Typography
                      className={styles.headingcontainer}
                      variant="span"
                      sx={{
                        marginTop: "5px",
                      }}
                    >
                      CVC code
                    </Typography>
                    <InputFeild />
                  </Box>
                </Box>
              </>
            )}
          </Box>
          <Box>
            <Typography
            className={styles.headingcontainer}
              variant="h6"
              sx={{ fontWeight: "100", marginTop: "10px" }}
            >
              Billing Address
            </Typography>
            <Box
              className={styles.boxcontainer}
              sx={{
                height: "200px",
                width: "550px",
                marginTop: "10px",
              }}
            >
              <Typography
                className={styles.headingcontainer}
                variant="p"
                sx={{
                  marginTop: "5px",
                }}
              >
                Country
              </Typography>
              <InputFeild />

              <Typography
                className={styles.headingcontainer}
                variant="p"
                sx={{ marginTop: "5px" }}
              >
                Region
              </Typography>
              <InputFeild />
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
                justifyContent: "center",
              }}
            >
              <Button className={styles.buttoncontainer}>Pay Now</Button>
              <Button className={styles.buttoncontainer}>Cancel</Button>
            </Box>
            <Box>
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "checkbox" }}
              />
              <Typography
                className={styles.headingcontainer}
                variant="p"
                sx={{ fontWeight: "400" }}
              >
                I agree to{" "}
                <span style={{ color: "#F33A10" }}>kaino.africa </span>terms of
                use & <span style={{ color: "#F33A10" }}> privacy policy</span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default SchoolPayment;
