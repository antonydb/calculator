import * as React from "react";
import { render } from "@testing-library/react";
import { Operators, Symbols } from "./Operators";

describe("<Operators />", () => {
  const { container } = render(<Operators onClick={() => undefined} />);

  it("should match snapshot", () => {
    expect(container.innerHTML).toMatchSnapshot();
  });
});
