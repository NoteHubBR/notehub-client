import { useContext } from "react";
import UserPreferencesContext from "../contexts/UserPreferencesContext";

export const usePref = () => useContext(UserPreferencesContext);