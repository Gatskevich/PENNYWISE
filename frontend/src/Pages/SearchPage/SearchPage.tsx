import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from "react";
import CardList from "../../Components/CardList/CardList";
import Search from "../../Components/Search/Search";
import { ICompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortflio";
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from "../../Services/PortfolioService";
import { toast } from "react-toastify";
import { PortfolioGet } from "../../Models/Portfolio";

type Props = {};

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>(
    []
  );
  const [searchResult, setSearchResult] = useState<ICompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getPortfolio = useCallback(() => {
    portfolioGetAPI()
      .then((res) => {
        if (res?.data) {
          setPortfolioValues(res?.data);
        }
      })
      .catch((e) => {
        setPortfolioValues(null);
      });
  }, []);

  const onPortfolioCreate = useCallback((e: any) => {
    e.preventDefault();
    portfolioAddAPI(e.target[0].value)
      .then((res) => {
        if (res?.status === 204) {
          toast.success("Stock added to portfolio!");
          getPortfolio();
        }
      })
    .catch((e) => {
      toast.warning("Could not add stock to portfolio!");
    });
  }, [portfolioValues, setPortfolioValues]);

  const onPortfolioDelete = useCallback((e: any) => {
    e.preventDefault();
    portfolioDeleteAPI(e.target[0].value).then((res) => {
      if (res?.status == 200) {
        toast.success("Stock deleted from portfolio!");
        getPortfolio();
      }
    });
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

  useEffect(() => {
    getPortfolio();
  }, []);

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

function getPortfolio() {
  throw new Error("Function not implemented.");
}
