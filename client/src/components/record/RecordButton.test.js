/******************************************************************************
 * Filename: RecordButton.test.js
 * Purpose:  Tests the RecordButton component.
 * Author:   Victor Nguyen
 *
 * Description:
 * This file contains tests for the RecordButton component. The tests ensure that
 * the component and its elements render correctly. A snapshot tests is included
 * to catch unintended changes to the component's structure or behavior.
 *
 * Usage:
 * Run the tests using the command `npm test`.
 *
 * Note:
 * More tests to be added/implemented to test actual functionality of the component
 * (e.g. recording audio).
 *
 ******************************************************************************/

import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import RecordButton from "./RecordButton";

test("whole record button component renders", () => {
  // Arrange
  render(<RecordButton />);
  const recordButtonElement = screen.getByTestId("record");

  // Assert
  expect(recordButtonElement).toBeInTheDocument();
});

test("record heading component renders", () => {
  // Arrange
  render(<RecordButton />);
  const recordHeadingElement = screen.getByTestId("record-heading");

  // Assert
  expect(recordHeadingElement).toBeInTheDocument();
});

test("correct record heading content", () => {
  // Arrange
  render(<RecordButton />);
  const recordHeadingElement = screen.getByTestId("record-heading");

  // Assert
  expect(recordHeadingElement).toHaveTextContent("Record");
});

test("record button component renders", () => {
  // Arrange
  render(<RecordButton />);
  const recordButtonElement = screen.getByTestId("record-file-input");

  // Assert
  expect(recordButtonElement).toBeInTheDocument();
});

test("correct record button content - start recording", () => {
  // Arrange
  render(<RecordButton />);
  const recordButtonElement = screen.getByTestId("record-file-input");

  // Assert
  expect(recordButtonElement).toHaveValue("Start Recording");
});

test.skip("correct record button content - stop recording", () => {
  // TODO: Implement test to check if the button content changes to "Stop Recording" when clicked
});

// Snapshot test
test("matches snapshot", () => {
  // Arrange
  const tree = renderer.create(<RecordButton />).toJSON();

  // Assert
  expect(tree).toMatchSnapshot();
});
