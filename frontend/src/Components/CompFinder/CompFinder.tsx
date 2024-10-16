import { useEffect, useState, useCallback} from "react";
import CompFinderItem from "./CompFinderItem/CompFinderItem";
import { ICompanyCompData } from "../../company";
import { getCompData } from "../../api";
import Spinner from "../Spinner/Spinner";
type Props = {
  ticker: string;
};

const CompFinder = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<ICompanyCompData>();

  const getComps = useCallback( async () => {
    const value = await getCompData(ticker);
    setCompanyData(value?.data[0]);
  }, [ticker]);

  useEffect(() => {
    getComps();
  }, [ticker]);

  return (
    <div className="inline-flex rounded-md shadow-sm m-4" role="group">
      {companyData ? (
        companyData?.peersList.map((ticker) => {
          return <CompFinderItem ticker={ticker} />;
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CompFinder;