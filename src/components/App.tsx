import * as React from "react";
import { Calculator } from "./Calculator";

export const App: React.FC<{}> = () => (
  <main data-testid="main">
    <Calculator />
  </main>
);
