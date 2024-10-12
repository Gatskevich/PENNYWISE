import React from "react";
import Hero from "../../Components/CardList/CardList";
import CardList from "../../Components/CardList/CardList";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <CardList searchResults={[{
        currency: "USD",
        exchangeShortName: "Nasdaq",
        name: "Apple Inc.",
        stockExchange: "NASDAQ",
        symbol: "AAPL",
      }, {
        currency: "USD",
        exchangeShortName: "Nasdaq",
        name: "Apple Inc.",
        stockExchange: "NASDAQ",
        symbol: "AAPL1",
      }]} />
    </>
  );
};

export default HomePage;