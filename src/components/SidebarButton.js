import { NavLink } from "react-router-dom";

function SidebarButton({ NavTo, icon, title }) {
  return (
    <NavLink
      to={NavTo}
      className="list-group-item mb-1 list-group-item-action d-flex align-items-center gap-2 fw-semibold p-2 rounded border-0 btn-hov text-theme-color"
    >
      {icon}
      {title}
    </NavLink>
  );
}

export default SidebarButton;
