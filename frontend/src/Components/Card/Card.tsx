import React from "react";
import { Link } from "react-router-dom";
import { ICompanySearch } from "../../company";
interface Props {
  id: string;
  searchResult: ICompanySearch;
}

const Card: React.FC<Props> = ({
  id,
  searchResult,
}: Props): JSX.Element => {
  return (
    <div
      className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
      key={id}
      id={id}
    >
      <Link
        to={`/company/${searchResult.symbol}/company-profile`}
        className="font-bold text-center text-veryDarkViolet md:text-left"
      >
        {searchResult.name} ({searchResult.symbol})
      </Link>
      <p className="text-veryDarkBlue">{searchResult.currency}</p>
      <p className="font-bold text-veryDarkBlue">
        {searchResult.exchangeShortName} - {searchResult.stockExchange}
      </p>
    </div>
  );
};

export default Card;