export enum Types {
  Clear = "Clear",
  Memory = "Memory",
  Operation = "Operation",
  Recall = "Recall",
  Submit = "Submit",
  Value = "Value",
}

export type Action =
  | { type: Types.Clear }
  | { type: Types.Memory }
  | { type: Types.Operation; payload: string }
  | { type: Types.Recall }
  | { type: Types.Submit }
  | { type: Types.Value; payload: string };

export interface State {
  equation: string;
  resetDisplayOnNextValue: boolean;
  resetEquationOnNextValue: boolean;
  display: string;
  memory: string | undefined;
}

const MAX_CHARS = 13;
const OPERATOR_PATTERN = /[-+*\/]+$/;

export const initialState: State = {
  equation: "",
  display: "0",
  resetDisplayOnNextValue: false,
  resetEquationOnNextValue: false,
  memory: undefined,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Types.Clear:
      return {
        ...initialState,
        memory: state.memory,
      };
    case Types.Value:
      if (
        state.display.length === MAX_CHARS ||
        (action.payload === "." && state.display.indexOf(".") > -1)
      ) {
        return state;
      }

      return {
        ...state,
        display: `${
          state.resetDisplayOnNextValue
            ? action.payload
            : action.payload === "."
            ? `${state.display}${action.payload}`
            : parseFloat(`${state.display}${action.payload}`)
        }`,
        equation: state.resetEquationOnNextValue
          ? action.payload
          : `${state.equation}${action.payload}`,
        resetDisplayOnNextValue: false,
        resetEquationOnNextValue: false,
      };
    case Types.Operation:
      return {
        ...state,
        equation: `${state.equation.replace(OPERATOR_PATTERN, "")}${
          action.payload
        }`,
        resetDisplayOnNextValue: true,
        resetEquationOnNextValue: false,
      };
    case Types.Submit:
      const result = `${eval(`${state.equation}`)}`;
      return {
        ...state,
        equation: result,
        resetDisplayOnNextValue: true,
        resetEquationOnNextValue: true,
        display: result,
      };
    case Types.Memory:
      return {
        ...state,
        memory: state.display,
      };
    case Types.Recall:
      if (state.memory) {
        return {
          ...state,
          display: state.memory,
          // Replace any trailing numbers with what is in memory
          equation: `${state.equation.replace(/[\.\d]+$/, "")}${state.memory}`,
        };
      }
      return state;
    default:
      return state;
  }
};
