import { useCallback, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getKeyMetrics } from "../../api";
import { ICompanyKeyMetrics } from "../../company";
import RatioList from "../RatioList/RatioList";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: ICompanyKeyMetrics) =>company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: ICompanyKeyMetrics) => company.currentRatioTTM,
    subTitle:
      "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: ICompanyKeyMetrics) => company.roeTTM,
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: ICompanyKeyMetrics) => company.returnOnTangibleAssetsTTM,
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
];

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<ICompanyKeyMetrics>();

  const getCompanyKeyRatios = useCallback( async () => {
    const value = await getKeyMetrics(ticker);
    setCompanyData(value?.data[0]);
  }, [ticker]);

  useEffect(() => {
    getCompanyKeyRatios();
  }, []);

  return (
    <>
      {companyData ? (
        <>
          <RatioList config={tableConfig} data={companyData} />
        </>
      ) : (
        "Loadig ..."
      )}
    </>
  );
};

export default CompanyProfile;