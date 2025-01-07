import { useContext } from "react";
import MenuContext from "../contexts/MenuContext";

export const useMenu = () => useContext(MenuContext);