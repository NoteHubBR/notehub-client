import { useContext } from "react";
import UserNotesContext from "../contexts/UserNotesContext";

export const useNotes = () => useContext(UserNotesContext);