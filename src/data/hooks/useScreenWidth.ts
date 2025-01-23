import { useContext } from "react";

import ScreenWidthContext from "../contexts/ScreenWidthContext";

export const useWidth = () => useContext(ScreenWidthContext);