import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { CryptoCorusel } from "../../api/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CryptoCard";
import styled from "@emotion/styled";

const CarouselContainer = styled("div")({
  height: "50%",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  paddingBottom: "50px",
});

const CarouselItem = styled(Link)({
  display: "flex",
  justifyContent: "center",

  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
});

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchCryptoCorusel = async () => {
    const { data } = await axios.get(CryptoCorusel(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchCryptoCorusel();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <CarouselItem key={coin.id} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </CarouselItem>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <CarouselContainer>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </CarouselContainer>
  );
};

export default Carousel;
