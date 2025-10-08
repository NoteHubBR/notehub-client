import { useContext } from "react";
import UserSubscriptionsContext from "../contexts/UserSubscriptionsContext";

export const useSubscriptions = () => useContext(UserSubscriptionsContext);