import { useContext } from "react";
import UserFollowingContext from "../contexts/UserFollowingContext";

export const useFollowing = () => useContext(UserFollowingContext);