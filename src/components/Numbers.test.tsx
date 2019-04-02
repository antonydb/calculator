import * as React from "react";
import { render } from "@testing-library/react";
import { Numbers } from "./Numbers";
import "@testing-library/jest-dom/extend-expect";

describe("<Numbers />", () => {
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((num) => {
    it(`renders a ${num}`, () => {
      const { getByText } = render(<Numbers onClick={() => undefined} />);
      expect(getByText(`${num}`)).toBeInTheDocument();
    });
  });
});
