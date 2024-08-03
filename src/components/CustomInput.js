function CustomInput({
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
    <div className="w-100">
      <div className="d-flex gap-3 align-items-center ms-2">
        {label && (
          <label htmlFor={name} className="w-25 fs-small fw-medium">
            {label}
          </label>
        )}
        <input
          className={`form-control flex-grow-1 fs-small fw-medium h-input${
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
          autoComplete="off"
        />
      </div>
      {invalidFeedback && (
        <div
          className={"invalid-feedback fs-075rem d-block"}
          {...(label && { style: { paddingRight: "25%" } })}
        >
          {invalidFeedback}
        </div>
      )}
    </div>
  );
}

export default CustomInput;
