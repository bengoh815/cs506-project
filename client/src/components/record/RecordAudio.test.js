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
 * More tests to be added/implemented for:
 * - Testing the recording functionality
 * - Testing the playback functionality
 * - Testing uploading the recorded audio
 *
 ******************************************************************************/

import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import RecordAudio from "./RecordAudio";

test("whole record button component renders", () => {
  // Arrange
  render(<RecordAudio />);
  const recordButtonElement = screen.getByTestId("record-group");

  // Assert
  expect(recordButtonElement).toBeInTheDocument();
});

test("record heading component renders", () => {
  // Arrange
  render(<RecordAudio />);
  const recordHeadingElement = screen.getByTestId("record-heading");

  // Assert
  expect(recordHeadingElement).toBeInTheDocument();
});

test("correct record heading content", () => {
  // Arrange
  render(<RecordAudio />);
  const recordHeadingElement = screen.getByTestId("record-heading");

  // Assert
  expect(recordHeadingElement).toHaveTextContent("Record");
});

test("record button component renders", () => {
  // Arrange
  render(<RecordAudio />);
  const recordButton = screen.getByTestId("record-button");

  // Assert
  expect(recordButton).toBeInTheDocument();
});

test("correct record button content - start recording", () => {
  // Arrange
  render(<RecordAudio />);
  const recordButton = screen.getByTestId("record-button");

  // Assert
  expect(recordButton).toHaveTextContent("Start Recording");
});

test.skip("correct record button content - stop recording", () => {
  // TODO: Implement test to check if the button content changes to "Stop Recording" when clicked
});

// Snapshot test
test("matches snapshot", () => {
  // Arrange
  const tree = renderer.create(<RecordAudio />).toJSON();

  // Assert
  expect(tree).toMatchSnapshot();
});
