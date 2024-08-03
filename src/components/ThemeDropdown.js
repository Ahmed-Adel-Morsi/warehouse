import {
  darkSvgLg,
  darkSvgSM,
  deviceSvgSM,
  lightSvgLg,
  lightSvgSM,
} from "../svgs/themeSVGs";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../features/themeSlice";

function ThemeDropdown({ children, forNavbar }) {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const themeIcon = theme === "dark" ? darkSvgLg : lightSvgLg;

  return (
    <div className={`${forNavbar ? "dropdown" : "dropup"}`}>
      <button
        type="button"
        className={`list-group-item list-group-item-action d-flex align-items-center p-2 gap-2 fs-small fw-medium btn-hov text-theme-color rounded border-0`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {themeIcon}
        {children}
      </button>
      <ul className={`dropdown-menu p-1 ${!forNavbar ? "theme-dropdown" : ""}`}>
        <li>
          <button
            className="dropdown-item rounded d-flex align-items-center gap-1 fs-small fw-medium mb-1 px-2 btn-hov"
            onClick={() => {
              dispatch(setTheme("light"));
            }}
          >
            {lightSvgSM}
            فاتح
          </button>
        </li>
        <li>
          <button
            className="dropdown-item rounded d-flex align-items-center gap-1 fs-small fw-medium mb-1 px-2 btn-hov"
            onClick={() => {
              dispatch(setTheme("dark"));
            }}
          >
            {darkSvgSM}
            داكن
          </button>
        </li>
        <li>
          <button
            className="dropdown-item rounded d-flex align-items-center gap-1 fs-small fw-medium px-2 btn-hov"
            onClick={() => {
              if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                dispatch(setTheme("dark"));
              } else {
                dispatch(setTheme("light"));
              }
            }}
          >
            {deviceSvgSM}
            الجهاز
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ThemeDropdown;
