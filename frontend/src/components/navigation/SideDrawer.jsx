import "./SideDrawer.css";
import { createPortal } from "react-dom";

export default function SideDrawer(props) {
  return createPortal(
    <aside className="side-drawer">{props.children}</aside>,
    document.getElementById("drawer"),
  );
}
