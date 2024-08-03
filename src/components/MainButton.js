import { useSelector } from "react-redux";

function MainButton({ btnIcon, btnTitle, clickHandler, type }) {
  const theme = useSelector((state) => state.theme);

  return (
    <button
      type={type || "button"}
      className={`btn ${
        theme === "dark" ? "btn-light" : "btn-dark"
      } d-flex align-items-center justify-content-center fs-small fw-medium py-2 px-3 gap-1`}
      onClick={clickHandler}
    >
      {btnTitle}
      {btnIcon}
    </button>
  );
}

export default MainButton;
