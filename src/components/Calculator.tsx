import * as React from "react";
import { Numbers } from "./Numbers";
import { Operators } from "./Operators";
import { Button, ButtonThemes } from "./Button";
import "./Calculator.css";
import { initialState, reducer, Types } from "../reducers/calculatorReducer";

export const replaceEndDigits = (str: string) => str.replace(/[\.\d]+$/, "");

export const Calculator: React.FC<{}> = () => {
  const [{ display }, dispatch] = React.useReducer(reducer, initialState);
  function handleClear() {
    dispatch({ type: Types.Clear });
  }
  function handleValue(payload: string) {
    dispatch({ type: Types.Value, payload });
  }
  function handleOperation(payload: string) {
    dispatch({ type: Types.Operation, payload });
  }
  function handleMemory() {
    dispatch({ type: Types.Memory });
  }
  function handleRecall() {
    dispatch({ type: Types.Recall });
  }

  return (
    <form
      className="calculator"
      onSubmit={(evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        dispatch({ type: Types.Submit });
      }}
    >
      <div className="result">{display}</div>
      <fieldset className="symbols">
        <div>
          <Button theme={ButtonThemes.Secondary} onClick={handleClear}>
            C
          </Button>
          <Button theme={ButtonThemes.Secondary} onClick={handleMemory}>
            M
          </Button>
          <Button theme={ButtonThemes.Secondary} onClick={handleRecall}>
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
