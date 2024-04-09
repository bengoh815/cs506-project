/******************************************************************************
 * Filename: AppLogo.test.jsx
 * Purpose:  Tests the AppLogo component
 * Author:   Victor Nguyen
 *
 * Description:
 * This file contains tests for the AppLogo component that ensure that the
 * component renders correctly. A snapshot test is included to catch unintended
 * changes to the components' structure.
 *
 * Usage:
 * Run the tests using the command `npm test`.
 *
 ******************************************************************************/

import { cleanup, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import AppLogo from "./AppLogo";

// Cleans up the DOM after each test to ensure a clean environment.
afterEach(() => {
  cleanup();
});

test("renders AppLogo component", () => {
  // Arrange
  render(<AppLogo />);
  const logoElement = screen.getByTestId("melody-logo");

  // Assert
  expect(logoElement).toBeInTheDocument();
});

// Snapshot test
test("matches snapshot", () => {
  // Arrange
  const tree = renderer.create(<AppLogo />).toJSON();

  // Assert
  expect(tree).toMatchSnapshot();
});
