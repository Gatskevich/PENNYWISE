import { useCallback, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getCashFlow } from "../../api";
import Table from "../Table/Table";
import { ICompanyCashFlow } from "../../company";
import Spinner from "../Spinner/Spinner";

type Props = {};

const config = [
  {
    label: "Date",
    render: (company: ICompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: ICompanyCashFlow) => company.operatingCashFlow,
  },
  {
    label: "Investing Cashflow",
    render: (company: ICompanyCashFlow) => company.netCashUsedForInvestingActivites,
  },
  {
    label: "Financing Cashflow",
    render: (company: ICompanyCashFlow) => company.netCashUsedProvidedByFinancingActivities,
  },
  {
    label: "Cash At End of Period",
    render: (company: ICompanyCashFlow) => company.cashAtEndOfPeriod,
  },
  {
    label: "CapEX",
    render: (company: ICompanyCashFlow) => company.capitalExpenditure,
  },
  {
    label: "Issuance Of Stock",
    render: (company: ICompanyCashFlow) => company.commonStockIssued,
  },
  {
    label: "Free Cash Flow",
    render: (company: ICompanyCashFlow) => company.freeCashFlow,
  },
];

const CashflowStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [cashFlowData, setCashFlowData] = useState<ICompanyCashFlow[]>();

  const getRatios = useCallback(async () => {
    const result = await getCashFlow(ticker);
    setCashFlowData(result!.data);
  }, []);

  useEffect(() => {
    getRatios();
  }, []);

  return cashFlowData ? (
    <Table config={config} data={cashFlowData}></Table>
  ) : (
    <Spinner />
  );
};

export default CashflowStatement;