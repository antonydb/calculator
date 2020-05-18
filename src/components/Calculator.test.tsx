import * as React from "react";
import { Calculator } from "./Calculator";
import { fireEvent, render } from "@testing-library/react";
import { Symbols } from "./Operators";

describe("<Calculator />", () => {
  it("should handle keyboard events", () => {
    const { getByTestId } = render(<Calculator />);
    const domNode = document.body;
    fireEvent.keyDown(domNode, { key: "2" });
    fireEvent.keyDown(domNode, { key: "+" });
    fireEvent.keyDown(domNode, { key: "6" });
    fireEvent.keyDown(domNode, { key: "-" });
    fireEvent.keyDown(domNode, { key: "1" });
    fireEvent.keyDown(domNode, { key: "*" });
    fireEvent.keyDown(domNode, { key: "2" });
    fireEvent.keyDown(domNode, { key: "/" });
    fireEvent.keyDown(domNode, { key: "4" });
    fireEvent.keyDown(domNode, { key: "Enter" });
    expect(getByTestId("display").textContent).toEqual("7.5");
  });

  it("should handle click events", () => {
    const { getByTestId, getByText } = render(<Calculator />);
    const domNode = document.body;
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText(Symbols.Add));
    fireEvent.click(getByText("6"));
    fireEvent.click(getByText(Symbols.Subtract));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText(Symbols.Multiply));
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText(Symbols.Divide));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("="));
    expect(getByTestId("display").textContent).toEqual("7.5");
  });
});
