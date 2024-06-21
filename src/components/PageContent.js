import "./PageContent.css";

function PageContent({ children }) {
  return (
    <>
      <div className="p-3 p-md-4 p-lg-5 flex-grow-1 overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </>
  );
}

export default PageContent;
