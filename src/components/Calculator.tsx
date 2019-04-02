import * as React from "react";
import { Numbers } from "./Numbers";
import { Operators } from "./Operators";
import { Button, ButtonThemes } from "./Button";
import "./Calculator.css";
import { initialState, reducer, Types } from "../reducers/calculatorReducer";

export const Calculator: React.FC<{}> = () => {
  const [{ display }, dispatch] = React.useReducer(reducer, initialState);

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
        <Numbers
          onClick={(payload: string) =>
            dispatch({ type: Types.Value, payload })
          }
        />
      </fieldset>
      <fieldset className="operators-panel">
        <Operators
          onClick={(payload: string) =>
            dispatch({ type: Types.Operation, payload })
          }
        />
      </fieldset>
    </form>
  );
};
