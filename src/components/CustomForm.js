function CustomForm({ onSubmit, children, id }) {
  return (
    <form
      {...(id && { id })}
      className="needs-validation d-flex flex-wrap gap-3"
      onSubmit={onSubmit}
      noValidate
    >
      {children}
    </form>
  );
}

export default CustomForm;
