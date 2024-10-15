import { useCallback, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

type Props = {};

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();

  const getCompanyKeyRatios = useCallback( async () => {

  }, [ticker]);

  useEffect(() => {
    getCompanyKeyRatios();
  }, []);

  return (
    <>
      Company Profile
    </>
  );
};

export default CompanyProfile;