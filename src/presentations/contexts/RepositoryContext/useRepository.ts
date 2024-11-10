import { useContext } from "react";

import { context } from "./context";

export const useRepository = () => useContext(context);
