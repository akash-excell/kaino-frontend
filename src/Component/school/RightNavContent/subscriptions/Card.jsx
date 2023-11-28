import React from "react";
import Typography from "@mui/material/Typography";

const CustomTypography = ({ variant, color, fontWeight, marginTop, children }) => {
  const typographyStyle = {
    color: color || "black",
    fontWeight: fontWeight || "300",
    marginTop: marginTop || "5px",
  };

  return (
    <Typography variant={variant} sx={typographyStyle}>
      {children}
    </Typography>
  );
};

export default CustomTypography;
