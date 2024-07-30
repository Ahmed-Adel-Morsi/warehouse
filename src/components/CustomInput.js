function ModalInput({
  type,
  name,
  label,
  value,
  required,
  disabled,
  onChange,
  onBlur,
  invalidFeedback,
}) {
  return (
    <div className="d-flex gap-3 w-100 ms-2">
      <label htmlFor={name} className="w-25 fs-small fw-medium">
        {label}
      </label>
      <div className="flex-grow-1">
        <input
          className={`form-control fs-small fw-medium h-input${
            invalidFeedback ? " is-invalid" : ""
          }`}
          type={type}
          id={name}
          name={name}
          value={value}
          required={required}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        />
        <div className="invalid-feedback fs-075rem">{invalidFeedback}</div>
      </div>
    </div>
  );
}

export default ModalInput;
