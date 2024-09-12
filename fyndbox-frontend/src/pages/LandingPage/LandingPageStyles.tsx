import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import bkImage from "../../assets/banner.jpg";

export const StyledContainer = styled(Container)({
  backgroundImage: `url(${bkImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  paddingTop: "150px",
  paddingBottom: "250px",
  backgroundPositionX: "center",
});

export const StyledTypography = styled(Typography)({
  color: "#ffffff",
});

