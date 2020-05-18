import * as React from "react";
import { Numbers, numbers } from "./Numbers";
import { Operators, Operations } from "./Operators";
import { Button, ButtonThemes } from "./Button";
import "./Calculator.css";
import { initialState, reducer, Types } from "../reducers/calculatorReducer";
import { useKeyDown } from "../hooks/useKeyDown";

export const Calculator: React.FC<{}> = () => {
  const [{ display }, dispatch] = React.useReducer(reducer, initialState);
  const handleValue = (payload: string) =>
    dispatch({ type: Types.Value, payload });
  const handleOperation = (payload: string) =>
    dispatch({ type: Types.Operation, payload });

  // Keydown event handlers
  useKeyDown(numbers.concat("."), (evt: KeyboardEvent) => {
    handleValue(evt.key);
  });
  useKeyDown(Object.values(Operations), (evt) => {
    handleOperation(evt.key);
  });
  useKeyDown("Enter", () => dispatch({ type: Types.Submit }));
  useKeyDown("Backspace", () => dispatch({ type: Types.Backspace }));

  return (
    <form
      className="calculator"
      onSubmit={(evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        dispatch({ type: Types.Submit });
      }}
    >
      <div className="result" data-testid="display">
        {display}
      </div>{" "}
      <fieldset className="symbols">
        <div>
          <Button
            theme={ButtonThemes.Secondary}
            onClick={() => dispatch({ type: Types.Clear })}
          >
            C
          </Button>
          <Button
            theme={ButtonThemes.Secondary}
            onClick={() => dispatch({ type: Types.Memory })}
          >
            M
          </Button>
          <Button
            theme={ButtonThemes.Secondary}
            onClick={() => dispatch({ type: Types.Recall })}
          >
            R
          </Button>
        </div>
      </fieldset>
      <fieldset className="numbers-panel">
        <Numbers onClick={handleValue} />
      </fieldset>
      <fieldset className="operators-panel">
        <Operators onClick={handleOperation} />
      </fieldset>
    </form>
  );
};
