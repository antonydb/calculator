import * as React from "react";
import { render } from "@testing-library/react";
import { Numbers } from "./Numbers";

describe("<Numbers />", () => {
  const { container } = render(<Numbers onClick={() => undefined} />);

  it(`should match snapshot`, () => {
    expect(container.innerHTML).toMatchSnapshot();
  });
});
