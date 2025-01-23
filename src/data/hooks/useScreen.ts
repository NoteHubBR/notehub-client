import { useContext } from "react";

import ScreenContext from "../contexts/ScreenContext";

export const useScreen = () => useContext(ScreenContext);