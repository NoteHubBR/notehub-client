import { useContext } from "react";
import UserTagsContext from "../contexts/UserTagsContext";

export const useTags = () => useContext(UserTagsContext);