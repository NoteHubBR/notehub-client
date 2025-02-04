import { useContext } from "react";
import UserNotificationsContext from "../contexts/UserNotificationsContext";

export const useNotifications = () => useContext(UserNotificationsContext);