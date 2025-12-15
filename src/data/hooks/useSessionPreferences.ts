import { useContext } from "react";
import UserSessionPreferencesContext from "../contexts/UserSessionPreferencesContext";

export const useSessionPref = () => useContext(UserSessionPreferencesContext);