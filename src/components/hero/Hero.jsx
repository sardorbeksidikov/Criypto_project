import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";
import styled from "@emotion/styled";
import BacImg from "../../assets/banner3.png";

const BannerContainer = styled("div")({
  backgroundImage: `url(${BacImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "500px",
  display: "flex",
  flexDirection: "column",
  paddingTop: "25px",
  justifyContent: "space-between", 
  color: "white",
});

const BannerContent = styled(Container)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between", 
});

const Tagline = styled("div")({
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  paddingBottom: "0", 
});

const CarouselContainer = styled("div")({
  height: "50%",
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  paddingTop: "0", 
});

function Banner() {
  return (
    <BannerContainer>
      <BannerContent>
        <Tagline>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginTop: "40px",
              marginBottom: 15,
              fontFamily: "Montserrat",
              color: "#87CEEB",
            }}>
            CRYPTOFOLIO WATCH LIST
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              
            }}>
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Tagline>
        <CarouselContainer>
          <Carousel />
        </CarouselContainer>
      </BannerContent>
    </BannerContainer>
  );
}

export default Banner;
