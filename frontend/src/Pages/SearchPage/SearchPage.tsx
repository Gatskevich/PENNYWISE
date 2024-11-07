import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react";
import CardList from "../../Components/CardList/CardList";
import Search from "../../Components/Search/Search";
import { ICompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortflio";

type Props = {};

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>(
    []
  );
  const [searchResult, setSearchResult] = useState<ICompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onPortfolioCreate = useCallback((e: any) => {
    e.preventDefault();
    const exist = portfolioValues.find(
      value => value === e.target[0].value
    )
    if(exist) return;

    const updatedPortfolioValues = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolioValues);
  }, [portfolioValues, setPortfolioValues]);

  const onPortfolioDelete = useCallback((e: any) => {
    e.preventDefault();
    const removedPortfolioValues = portfolioValues.filter(
      value => value !== e.target[0].value
    )
    setPortfolioValues(removedPortfolioValues);
  }, [portfolioValues, setPortfolioValues]);

  const onSearchSubmit = useCallback( async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);

    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
  }, [search]);

  return (
    <>
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues!}
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList 
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
       {serverError && <div>Unable to connect to API</div>}
    </>
  );
};

export default SearchPage;