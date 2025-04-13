import { useContext } from "react";
import UserFlamesContext from "../contexts/UserFlamesContext";

export const useFlames = () => useContext(UserFlamesContext);