import axios from "axios";
import { useEffect, useState } from "react";
import { CryptoChart } from "../api/api";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
import { chartDays } from "../api/data";
import { CryptoState } from "../CryptoContext";
import styled from "@emotion/styled";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 25,
    padding: 40,
    "@media (max-width: 960px)": {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
  chartContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
    "@media (max-width: 960px)": {
      flexWrap: "wrap",
    },
  },
};

const StyledContainer = styled("div")(useStyles.container);
const ChartContainer = styled("div")(useStyles.chartContainer);
const ButtonContainer = styled("div")(useStyles.buttonContainer);

const CustomButtonContainer = styled(ButtonContainer)({
  gap: "30px",
  flexWrap: "wrap",
  marginTop: "20px",
  backgroundColor: "#2A2A2A",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  "@media (max-width: 960px)": {
    justifyContent: "space-between",
  },
  "@media (max-width: 600px)": {
    justifyContent: "center",
  },
});

const CoinInfo = ({ coin }) => {
  const [CryptoChartData, setCryptoChartData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);

  const fetchCryptoChartData = async () => {
    const { data } = await axios.get(CryptoChart(coin.id, days, currency));
    setFlag(true);
    setCryptoChartData(data.prices);
  };

  useEffect(() => {
    fetchCryptoChartData();
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <StyledContainer>
        {!CryptoChartData || flag === false ? (
          <CircularProgress
            style={{ color: "#87CEEB" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <ChartContainer>
              <Line
                data={{
                  labels: CryptoChartData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets: [
                    {
                      data: CryptoChartData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#87CEEB",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
            </ChartContainer>
            <CustomButtonContainer>
              {chartDays.map((day) => (
                <Button
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setFlag(false);
                  }}
                  variant={day.value === days ? "contained" : "outlined"}
                  sx={{
                    margin: "0 20px",
                    border: "2px solid #87CEEB",
                    borderRadius: "5px",
                    color: "black",

                    padding: "8px 50px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#87CEEB",
                      color: "black",
                    },
                  }}>
                  {day.label}
                </Button>
              ))}
            </CustomButtonContainer>
          </>
        )}
      </StyledContainer>
    </ThemeProvider>
  );
};

export default CoinInfo;
