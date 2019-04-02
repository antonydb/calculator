import * as React from "react";
import "./Button.css";

export enum ButtonThemes {
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
}

interface ButtonProps {
  children: string;
  theme?: ButtonThemes;
  type?: "button" | "submit" | "reset" | undefined;
  value?: string;
  onClick?: (val: string) => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  value,
  theme = ButtonThemes.Default,
  type = "button",
  onClick,
  ...rest
}) => (
  <button
    className={`button button-${theme}`}
    type={type}
    value={value}
    onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(evt.currentTarget.value);
      }
    }}
    {...rest}
  >
    {children}
  </button>
);
