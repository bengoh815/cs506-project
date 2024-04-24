/******************************************************************************
 * Filename: RecordAudio.test.js
 * Purpose:  Tests the RecordAudio component.
 * Author:   Victor Nguyen
 *
 * Description:
 * This file contains tests for the RecordAudio component. The tests ensure that
 * the component and its elements render correctly. A snapshot test is included
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

import { cleanup, render, screen } from "@testing-library/react";
import RecordAudio from "./RecordAudio";

describe("Record Audio Component", () => {
  // Cleans up the DOM after each test to ensure a clean environment.
  afterEach(() => {
    cleanup();
  });

  it("whole record button component renders", () => {
    // Arrange
    render(<RecordAudio />);
    const recordButtonElement = screen.getByTestId("record-group");

    // Assert
    expect(recordButtonElement).toBeInTheDocument();
  });

  it("record heading component renders", () => {
    // Arrange
    render(<RecordAudio />);
    const recordHeadingElement = screen.getByTestId("record-heading");

    // Assert
    expect(recordHeadingElement).toBeInTheDocument();
  });

  it("correct record heading content", () => {
    // Arrange
    render(<RecordAudio />);
    const recordHeadingElement = screen.getByTestId("record-heading");

    // Assert
    expect(recordHeadingElement).toHaveTextContent("Record");
  });

  it("record button component renders", () => {
    // Arrange
    render(<RecordAudio />);
    const recordButton = screen.getByTestId("record-button");

    // Assert
    expect(recordButton).toBeInTheDocument();
  });

  it("correct record button content - start recording", () => {
    // Arrange
    render(<RecordAudio />);
    const recordButton = screen.getByTestId("record-button");

    // Assert
    expect(recordButton).toHaveTextContent("Start Recording");
  });
});
