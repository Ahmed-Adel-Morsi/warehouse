function ChosenProductDetails({ quantity, price }) {
  return (
    <div className="d-flex gap-3 text-muted">
      <p className="mb-0">العدد بالمخزن : {quantity || 0}</p>
      <p className="mb-0">السعر بالمخزن : {price || 0}</p>
    </div>
  );
}

export default ChosenProductDetails;
