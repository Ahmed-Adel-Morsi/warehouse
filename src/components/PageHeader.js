function PageHeader({ children }) {
  return (
    <h1 className="fw-boldest text-center text-lg-end mb-3 mb-md-5">
      {children}
    </h1>
  );
}

export default PageHeader;
