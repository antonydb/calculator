import * as React from "react";
import { render } from "@testing-library/react";
import { Operators, Symbols } from "./Operators";
import "@testing-library/jest-dom/extend-expect";

describe("<Operators />", () => {
  [Symbols.Add, Symbols.Subtract, Symbols.Divide, Symbols.Multiply].forEach(
    (symbol) => {
      it(`renders a ${symbol} symbol`, () => {
        const { getByText } = render(<Operators onClick={() => undefined} />);
        expect(getByText(symbol)).toBeInTheDocument();
      });
    }
  );
});
