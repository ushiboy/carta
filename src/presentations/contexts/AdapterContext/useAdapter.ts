import { useContext } from "react";

import { context } from "./context";

export const useAdapter = () => useContext(context);
