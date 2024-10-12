import React from "react";
import Card from "../Card/Card";
import { ICompanySearch } from "../../company";

interface Props {
  searchResults: ICompanySearch[];
}

const CardList: React.FC<Props> = ({
  searchResults,
}: Props): JSX.Element => {
  return (
    <div>
      {searchResults.length > 0 ? (
        searchResults.map((result) => {
          return (
            <Card
              id={result.symbol}
              key={result.symbol}
              searchResult={result}
            />
          );
        })
      ) : (
        <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No results!
        </p>
      )}
    </div>
  );
};

export default CardList;