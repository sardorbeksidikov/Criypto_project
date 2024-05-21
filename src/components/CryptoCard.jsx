import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@mui/material";
import axios from "axios";
import { CryptoList } from "../api/api";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { Pagination } from "@mui/material";
import styled from "@emotion/styled";
import EyeWhite from "../assets/EyeWhite.svg";
import EyeGreen from "../assets/EyeGreen.svg";
import debounce from "lodash.debounce";
import { Info } from "../Pages";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = styled({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const { currency, symbol } = CryptoState();
  const classes = useStyles();
  const navigate = useNavigate();

  const fetchCoins = useCallback(async () => {
    setLoading(true);
    const { data } = await axios.get(CryptoList(currency));
    setCoins(data);
    setLoading(false);
  }, [currency]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const toggleWatchlist = (coinId) => {
    setWatchlist((prev) => {
      const updated = prev.includes(coinId)
        ? prev.filter((id) => id !== coinId)
        : [...prev, coinId];
      localStorage.setItem("watchlist", JSON.stringify(updated));
      return updated;
    });
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value.toLowerCase());
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={handleSearchChange}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#87CEEB" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#87CEEB" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}>
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    const isInWatchlist = watchlist.includes(row.id);

                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}>
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}>
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          style={{
                           
                            alignItems: "center",
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}>
                          <img
                            src={isInWatchlist ? EyeGreen : EyeWhite}
                            alt="Eye Icon"
                            style={{ marginRight: 10, marginTop: "5px" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWatchlist(row.id);
                            }}
                          />
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={Math.ceil(handleSearch().length / 10)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
