import "./PageContent.css";

function PageContent(props) {
  return (
    <div className="p-3 p-md-4 p-lg-5 w-lg-100 content-w-lg-100 vh-100 overflow-y-auto">
      {props.children}
    </div>
  );
}

export default PageContent;
