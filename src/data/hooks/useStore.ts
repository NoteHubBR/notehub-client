import { useContext } from "react";
import UserStoreContext from "../contexts/UserStoreContext";

export const useStore = () => useContext(UserStoreContext);