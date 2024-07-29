function DropdownSmallButton({ btnIcon, btnTitle, clickHandler }) {
  return (
    <button
      type="button"
      className="dropdown-item rounded d-flex align-items-center gap-1 px-2 fs-small fw-medium"
      onClick={clickHandler}
    >
      {btnIcon}
      {btnTitle}
    </button>
  );
}

export default DropdownSmallButton;
