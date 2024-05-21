import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  Button,
  Drawer,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Crypto, CryptoState } from "../CryptoContext";
import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const Title = styled(Typography)({
  flex: 1,
  color: "#87CEEB",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

const WatchlistContainer = styled("div")({
  width: "100%", // Adjusted to full width
  maxWidth: "30vw", // Max width set to 30vw
  backgroundColor: "grey",
  height: "100%",
  padding: "20px",
  position: "relative",
  overflowX: "hidden", // Prevents horizontal overflow
});

const WatchlistGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(2, auto)",
  gap: "10px",
  marginTop: "20px",
});

const WatchlistItem = styled("div")({
  backgroundColor: "#1c1c1c",
  borderRadius: "10px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "white",
});

const WatchlistItemImage = styled("img")({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  marginBottom: "10px",
});

const WatchlistItemDetails = styled("div")({
  textAlign: "center",
});

const WatchlistItemName = styled("p")({
  margin: 0,
  fontSize: "16px",
  fontWeight: "bold",
});

const WatchlistItemPrice = styled("p")({
  margin: 0,
  fontSize: "14px",
  color: "#87CEEB",
});

const RemoveButton = styled(Button)({
  backgroundColor: "red",
  marginTop: "10px",
  color: "white",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "darkred",
  },
});

function Header() {
  const { currency, setCurrency } = CryptoState();
  const navigate = useNavigate();
  const { reflesh, setReflesh } = useContext(Crypto);
  const [isWatch, setIsWatch] = useState(false);
  const [data, setData] = useState([]);

  const handleWatch = () => {
    setIsWatch((prev) => !prev);
  };

  useEffect(() => {
    const card = JSON.parse(localStorage.getItem("card")) || [];
    if (card) {
      setData(card);
    }
  }, [reflesh]);

  const handelRemove = (id) => {
    const card = JSON.parse(localStorage.getItem("card"));

    if (card) {
      const cardUpdate = card?.filter((el) => el?.id !== id);
      localStorage.setItem("card", JSON.stringify(cardUpdate));
      setData(cardUpdate);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        color="transparent"
        position="sticky"
        sx={{ backgroundColor: "#515151" }}>
        <Container>
          <Toolbar
            sx={{
              flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on extra small screens
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Title onClick={() => navigate(`/`)} variant="h6">
              CRYPTOFOLIO
            </Title>
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue="USD"
              value={currency}
              sx={{
                color: "white",
                width: { xs: "80px", sm: "100px" },
                height: "40px",
                marginLeft: { xs: 0, sm: 2 },
                marginTop: { xs: 1, sm: 0 },
              }}
              onChange={(e) => setCurrency(e.target.value)}
              >

              <MenuItem defaultValue={'USD'} value={"USD"}>USD</MenuItem>
              <MenuItem value={"MXN"}>MXN</MenuItem>
              <MenuItem value={"RUB"}>RUB</MenuItem>
            </Select>
            <Button
              onClick={handleWatch}
              sx={{
                margin: { xs: "10px 0", sm: "0 20px" },
                border: "2px solid #87CEEB",
                borderRadius: "5px",
                color: "black",
                backgroundColor: "#87CEEB",
                padding: { xs: "6px 12px", sm: "8px 30px" },
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#87CEEB",
                  color: "black",
                },
              }}>
              WATCHLIST
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="right" open={isWatch} onClose={handleWatch}>
        <WatchlistContainer>
          <IconButton
            onClick={handleWatch}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "white",
            }}>
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              textAlign: "center",
              marginBottom: "10px",
            }}>
            Your Watchlist
          </Typography>
          <WatchlistGrid>
            {data &&
              data.map((el, i) => (
                <WatchlistItem key={el.id}>
                  <WatchlistItemImage src={el?.image.large} alt={el.name} />
                  <WatchlistItemDetails>
                    <WatchlistItemName>{el.name}</WatchlistItemName>
                    <WatchlistItemPrice>
                      {currency === "USD"
                        ? `$${el?.market_data?.current_price.usd}`
                        : `₹${el?.market_data?.current_price.inr}`}
                    </WatchlistItemPrice>
                  </WatchlistItemDetails>
                  <RemoveButton onClick={() => handelRemove(el?.id)}>
                    Remove
                  </RemoveButton>
                </WatchlistItem>
              ))}
          </WatchlistGrid>
        </WatchlistContainer>
      </Drawer>
    </ThemeProvider>
  );
}

export default Header;
