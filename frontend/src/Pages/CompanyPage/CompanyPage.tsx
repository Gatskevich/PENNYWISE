import { useParams } from "react-router-dom";

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();

  return (
    <>
      Company Page
    </>
  );
};

export default CompanyPage;