function SearchInput({ name, placeholder, onChange }) {
  return (
    <input
      type="search"
      name={name}
      className="form-control w-100 fs-small fw-medium search-input pe-30px"
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="off"
    />
  );
}

export default SearchInput;
