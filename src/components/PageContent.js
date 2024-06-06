import { useLocation } from "react-router-dom";
import "./PageContent.css";
import { PATH_TO_HEADING } from "../routes/routes";
import PageHeader from "./PageHeader";

function PageContent(props) {
  const location = useLocation();
  const heading = PATH_TO_HEADING[location.pathname];

  return (
    <>
      <div className="p-3 p-md-4 p-lg-5 w-lg-100 content-w-lg-100 vh-100 overflow-y-auto">
        {heading && <PageHeader>{heading}</PageHeader>}
        {props.children}
      </div>
    </>
  );
}

export default PageContent;
