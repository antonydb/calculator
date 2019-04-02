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
  display: string;
  memory: string | undefined;
}

const MAX_CHARS = 13;
const OPERATOR_PATTERN = /[-+*\/]+$/;
export const replaceEndDigits = (str: string) => str.replace(/[\.\d]+$/, "");

export const initialState: State = {
  equation: "",
  display: "0",
  resetDisplayOnNextValue: true,
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
        equation: `${state.equation}${action.payload}`,
        resetDisplayOnNextValue: false,
      };
    case Types.Operation:
      return {
        ...state,
        equation: `${state.equation.replace(OPERATOR_PATTERN, "")}${
          action.payload
        }`,
        resetDisplayOnNextValue: true,
      };
    case Types.Submit:
      const result = `${eval(`${state.equation}`)}`;
      return {
        ...state,
        equation: result,
        resetDisplayOnNextValue: true,
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
          equation: `${replaceEndDigits(state.equation)}${state.memory}`,
        };
      }
      return state;
    default:
      return state;
  }
};
