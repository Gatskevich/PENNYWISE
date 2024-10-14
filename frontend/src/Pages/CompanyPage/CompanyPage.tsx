import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyProfile } from "../../api";
import { ICompanyProfile } from "../../company";

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();

  const [company, setCompany] = useState<ICompanyProfile>();

  const getProfileInit = useCallback( async () => {
    const result = await getCompanyProfile(ticker!);
    setCompany(result?.data[0]);
  }, []);

  useEffect(() => {
    getProfileInit();
  }, []);

  return (
    <>
    {
      company ? (
        <div>{company.companyName}</div>
      ) : (
        <div>Company not found!</div>
      )
    }
    </>
  );
};

export default CompanyPage;