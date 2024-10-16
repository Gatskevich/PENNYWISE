import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import Table from "../Table/Table";
import { ICompanyIncomeStatement } from "../../company";
import { getIncomeStatement } from "../../api";

type Props = {};

const configs = [
  {
    label: "Date",
    render: (company: ICompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: ICompanyIncomeStatement) => company.revenue,
  },
  {
    label: "Cost Of Revenue",
    render: (company: ICompanyIncomeStatement) => company.costOfRevenue,
  },
  {
    label: "Depreciation",
    render: (company: ICompanyIncomeStatement) => company.depreciationAndAmortization,
  },
  {
    label: "Operating Income",
    render: (company: ICompanyIncomeStatement) => company.operatingIncome,
  },
  {
    label: "Income Before Taxes",
    render: (company: ICompanyIncomeStatement) => company.incomeBeforeTax,
  },
];

const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] =
    useState<ICompanyIncomeStatement[]>();

  const getRatios = useCallback( async () => {
    const result = await getIncomeStatement(ticker!);
    setIncomeStatement(result!.data);
  }, []);

  useEffect(() => {
    getRatios();
  }, []);

  return (
    <>
      {incomeStatement ? (
        <Table config={configs} data={incomeStatement} />
      ) : (
        "Loading ..."
      )}
    </>
  );
};

export default IncomeStatement;