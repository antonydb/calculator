import * as React from "react";
import { Button } from "./Button";
import "./Numbers.css";

interface NumbersProps {
  onClick: (val: string) => void;
}

const numbers = Array.from(Array(10).keys()).map((val) => `${val}`);

export const Numbers: React.FC<NumbersProps> = ({ onClick }) => (
  <div className="numbers">
    <Button value="." onClick={onClick}>
      .
    </Button>
    {numbers.map((value) => (
      <Button key={value} value={value} onClick={onClick}>
        {value}
      </Button>
    ))}
  </div>
);
