import { useContext } from "react";
import UserHistoryContext from "../contexts/UserHistoryContext";

export const useHistory = () => useContext(UserHistoryContext);