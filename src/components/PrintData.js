function PrintData({ data }) {
  return <p className="mt-3 d-none d-print-block fw-bold fs-6">{data}</p>;
}

PrintData.Signature = () => {
  return <PrintData data="التوقيع:" />;
};

PrintData.InvNumber = ({ permissionInfo }) => {
  return (
    <PrintData
      data={`رقم الاذن: ${permissionInfo ? permissionInfo.invoiceNumber : ""}`}
    />
  );
};

PrintData.InvDate = ({ permissionInfo }) => {
  return (
    <PrintData
      data={`تحريراً في: ${permissionInfo ? permissionInfo.createdAt : ""}`}
    />
  );
};

export default PrintData;
