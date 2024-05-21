export const CryptoList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=60&page=1&sparkline=false`;

export const SingleCrypto = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const CryptoChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const CryptoCorusel = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h`;
