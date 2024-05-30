import { useLocation } from "react-router-dom";
import "./PageContent.css";
import { PATH_TO_HEADING } from "../routes/routes";

function PageContent(props) {
  const location = useLocation();
  const heading = PATH_TO_HEADING[location.pathname] || 'Not Found';

  return (
    <>
      <div className="p-3 p-md-4 p-lg-5 w-lg-100 content-w-lg-100 vh-100 overflow-y-auto">
        <h1 className="fw-boldest text-center text-lg-end mb-3 mb-md-5">
          {heading}
        </h1>
        {props.children}
      </div>
    </>
  );
}

export default PageContent;
