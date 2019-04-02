import { initialState, reducer, State, Types } from "./calculatorReducer";

describe("reducer", () => {
  describe("when 'clear' is dispatched", () => {
    it("should return initial state", () => {
      expect(reducer({} as State, { type: Types.Clear })).toEqual(initialState);
    });
  });
  describe("when 'value' is dispatched", () => {
    it("should append entered values to the display", () => {
      const state = {
        display: "1",
        equation: "1",
        resetDisplayOnNextValue: false,
        memory: undefined,
      };
      expect(
        reducer(state, { type: Types.Value, payload: "2" }).display
      ).toEqual("12");
    });
    it("should append dots to the display", () => {
      const state = {
        display: "1",
        equation: "1",
        memory: undefined,
        resetDisplayOnNextValue: false,
      };
      expect(
        reducer(state, { type: Types.Value, payload: "." }).display
      ).toEqual("1.");
    });
    it("should prevent more than 13 characters the display", () => {
      const display = "1234567890123";
      const state = {
        display,
        equation: display,
        memory: undefined,
        resetDisplayOnNextValue: false,
      };
      expect(
        reducer(state, { type: Types.Value, payload: "3" }).display
      ).toEqual(display);
    });
    it("should not display more than 1 dot", () => {
      const display = "3.142";
      const state = { ...initialState, display };
      expect(
        reducer(state, { type: Types.Value, payload: "." }).display
      ).toEqual(display);
    });
    it("should ignore leading zeroes in the display", () => {
      const state = { ...initialState, display: "0" };
      expect(
        reducer(state, { type: Types.Value, payload: "3" }).display
      ).toEqual("3");
    });
    it("should set resetDisplayOnNextValue to false", () => {
      const state = { ...initialState, lastOperation: "+" };
      expect(
        reducer(state, { type: Types.Value, payload: "3" })
          .resetDisplayOnNextValue
      ).toEqual(false);
    });
  });
  describe("when 'operation' is dispatched", () => {
    it("should not change the display", () => {
      const display = "3";
      const state = {
        display,
        equation: "1+1",
        memory: undefined,
        resetDisplayOnNextValue: false,
      };
      expect(
        reducer(state, { type: Types.Operation, payload: "-" }).display
      ).toEqual(display);
    });
    it("should add the operation to the equation", () => {
      const state = {
        display: "1",
        equation: "1+1",
        memory: undefined,
        resetDisplayOnNextValue: false,
      };
      expect(
        reducer(state, { type: Types.Operation, payload: "-" }).equation
      ).toEqual("1+1-");
    });
    it("should not change the display", () => {
      const display = "3";
      const state = {
        display,
        equation: "1+1",
        memory: undefined,
        resetDisplayOnNextValue: false,
      };
      expect(
        reducer(state, { type: Types.Operation, payload: "-" }).display
      ).toEqual(display);
    });
    it("should set resetDisplayOnNextValue to true", () => {
      const state = {
        display: "2",
        equation: "1+1",
        memory: undefined,
        resetDisplayOnNextValue: false,
      };
      expect(
        reducer(state, { type: Types.Operation, payload: "*" })
          .resetDisplayOnNextValue
      ).toEqual(true);
    });
  });

  describe("submit", () => {
    it("should reset the equation to the resulting value", () => {
      const state = {
        display: "4",
        equation: "1+2*4",
        memory: undefined,
        resetDisplayOnNextValue: false,
      };
      expect(reducer(state, { type: Types.Submit }).equation).toEqual("9");
    });
    it("should set resetDisplayOnNextValue to true", () => {
      const state = {
        display: "4",
        equation: "1+2*4",
        memory: undefined,
        resetDisplayOnNextValue: false,
      };
      expect(
        reducer(state, { type: Types.Submit }).resetDisplayOnNextValue
      ).toEqual(true);
    });
    it("should display the evaluated equation", () => {
      expect(
        reducer(
          {
            display: "4",
            equation: "1+2*4",
            memory: undefined,
            resetDisplayOnNextValue: false,
          },
          { type: Types.Submit }
        ).display
      ).toEqual("9");
      expect(
        reducer(
          {
            display: "4",
            equation: "9-3*4+18/4",
            memory: undefined,
            resetDisplayOnNextValue: false,
          },
          { type: Types.Submit }
        ).display
      ).toEqual("1.5");
    });
  });

  describe("memory", () => {
    it("should store the display in a state key named memory", () => {
      expect(
        reducer(
          {
            display: "4",
            resetDisplayOnNextValue: false,
            equation: "1+2*4",
            memory: undefined,
          },
          { type: Types.Memory }
        ).memory
      ).toEqual("4");
    });
  });

  describe("recall", () => {
    it("should only write the value in memory to the display if the value memory is not empty", () => {
      const display = "4";
      expect(
        reducer(
          {
            display,
            resetDisplayOnNextValue: false,
            equation: "1+2*4",
            memory: undefined,
          },
          { type: Types.Recall }
        ).display
      ).toEqual(display);
    });
    it("should write the value in memory to the display", () => {
      expect(
        reducer(
          {
            display: "4",
            resetDisplayOnNextValue: false,
            equation: "1+2*4",
            memory: "12",
          },
          { type: Types.Recall }
        ).display
      ).toEqual("12");
    });
    it("should replace the last value in the equation with the value in memory", () => {
      const prefix = "1+2*";
      expect(
        reducer(
          {
            display: "4",
            resetDisplayOnNextValue: false,
            equation: `${prefix}431`,
            memory: "63",
          },
          { type: Types.Recall }
        ).equation
      ).toEqual(`${prefix}63`);
    });
  });
});
