import * as React from "react";
import { Button, ButtonThemes } from "./Button";
import "./Operators.css";

export enum Symbols {
  Multiply = "×",
  Divide = "÷",
  Subtract = "-",
  Add = "+",
}

export enum Operations {
  Multiply = "*",
  Divide = "/",
  Subtract = "-",
  Add = "+",
}

const OperationsDict = {
  [Operations.Multiply]: Symbols.Multiply,
  [Operations.Divide]: Symbols.Divide,
  [Operations.Subtract]: Symbols.Subtract,
  [Operations.Add]: Symbols.Add,
};

interface OperatorsProps {
  onClick: (val: string) => void;
}

export const Operators: React.FC<OperatorsProps> = ({ onClick }) => (
  <div className="operators">
    {Object.entries(OperationsDict).map(([value, text]) => (
      <Button
        key={value}
        theme={ButtonThemes.Primary}
        value={value}
        onClick={onClick}
      >
        {text}
      </Button>
    ))}
    <Button theme={ButtonThemes.Primary} type="submit">
      =
    </Button>
  </div>
);
