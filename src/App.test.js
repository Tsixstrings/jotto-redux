import { mount } from "enzyme";
import { Provider } from "react-redux";

import { findByTestAttr, storeFactory } from "../test/testUtils";
import App from "./App";

//activate global mock to make sure getSecretWord doesn't make network call
import { getSecretWord as mockGetSecretWord } from "./actions";
import { EXPORTDECLARATION_TYPES } from "@babel/types";
jest.mock("./actions");

const setup = () => {
  const store = storeFactory();
  //use mount because useEffect is not called on "shallow" mode
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent).toHaveLength(1);
});

describe("get secret word", () => {
  beforeEach(() => {
    //clear the mock calls from previous tests
    mockGetSecretWord.mockClear();
  });
  test("get secret word on app mount", () => {
    const wrapper = setup();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  test("getSecretWord does not run on app update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    //using setProps because wrapper.update() does not trigtger useEffect
    wrapper.setProps();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
