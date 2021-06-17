import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import { Provider } from "react-redux";

import Input from "./Input";

//Mock entire module for destructuring inside the component (instead of React.useState)
// const mockSetCurrentGuess = jest.fn();

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: (initialState) => [initialState, mockSetCurrentGuess]
// }))

const setup = (initialState = {}, secretWord = "party") => {
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <Input secretWord={secretWord} />
    </Provider>
  );
};

describe("Tests for Guess Input", () => {
  describe("Input Field Renders", () => {
    describe("Success is true", () => {
      let wrapper;
      beforeEach(() => {
        wrapper = setup({ success: true });
      });
      test("input renders without error", () => {
        const inputComponent = findByTestAttr(wrapper, "component-input");
        expect(inputComponent.length).toBe(1);
      });
      test("input box does not whow", () => {
        const inputBox = findByTestAttr(wrapper, "input-box");
        expect(inputBox.exists()).toBe(false);
      });
      test("submit button does not show", () => {
        const submitButton = findByTestAttr(wrapper, "submit-button");
        expect(submitButton.exists()).toBe(false);
      });
    });
    describe("Success is false", () => {
      let wrapper;
      beforeEach(() => {
        wrapper = setup({ success: false });
      });
      test("input renders without error", () => {
        const inputComponent = findByTestAttr(wrapper, "component-input");
        expect(inputComponent.length).toBe(1);
      });
      test("input box does not whow", () => {
        const inputBox = findByTestAttr(wrapper, "input-box");
        expect(inputBox.exists()).toBe(true);
      });
      test("submit button does not show", () => {
        const submitButton = findByTestAttr(wrapper, "submit-button");
        expect(submitButton.exists()).toBe(true);
      });
    });
  });

  test("Input renders without error", () => {
    const wrapper = setup();
    const inputComponent = findByTestAttr(wrapper, "component-input");
    expect(inputComponent.length).toBe(1);
  });

  describe("state controlled input field", () => {
    let mockSetCurrentGuess = jest.fn();
    let wrapper;
    let originalUseState;

    beforeEach(() => {
      mockSetCurrentGuess.mockClear();
      originalUseState = React.useState;
      React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
      wrapper = setup({ success: false });
    });
    afterEach(() => {
      React.useState = originalUseState;
    });
    test("state updates with value of input box upon change", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      const mockEvent = { target: { value: "train" } };
      inputBox.simulate("change", mockEvent);

      expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
    });
    test("field is cleared upon submit button click", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      submitButton.simulate("click", { preventDefault() {} });
      expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
    });
  });
});
