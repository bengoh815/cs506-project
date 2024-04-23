/******************************************************************************
 * Filename: FileUpload.test.js
 * Purpose:  Tests the FileUpload component.
 * Author:   Victor Nguyen
 *
 * Description:
 * This file contains tests for the FileUpload component. The tests ensure that
 * the component and its elements render correctly. A snapshot test is also included
 * to catch unintended changes to the component's structure or behavior.
 *
 * Usage:
 * Run the tests using the command `npm test`.
 *
 * Note:
 * More tests to be added to test actual functionality of the component
 * (e.g. file upload).
 *
 ******************************************************************************/

import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import FileUpload from "./FileUpload";

describe("FileUpload component", () => {
  // Cleans up the DOM after each test to ensure a clean environment.
  afterEach(() => {
    cleanup();
  });

  it("whole file upload component renders", () => {
    // Arrange
    render(<FileUpload />);
    const fileUploadElement = screen.getByTestId("upload");

    // Assert
    expect(fileUploadElement).toBeInTheDocument();
  });

  it("heading renders", () => {
    // Arrange
    render(<FileUpload />);
    const headingElement = screen.getByTestId("upload-heading");

    // Assert
    expect(headingElement).toBeInTheDocument();
  });

  it("correct heading content", () => {
    // Arrange
    render(<FileUpload />);
    const headingElement = screen.getByTestId("upload-heading");

    // Assert
    expect(headingElement.textContent).toBe("Upload & Convert");
  });

  it("choose file button renders", () => {
    // Arrange
    render(<FileUpload />);
    const chooseFileButton = screen.getByTestId("choose-file-button");

    // Assert
    expect(chooseFileButton).toBeInTheDocument();
  });

  it("correct choose file button label when NO file is selected", () => {
    // Arrange
    render(<FileUpload />);
    const chooseFileButton = screen.getByTestId("choose-file-button");

    // Assert
    expect(chooseFileButton).toHaveTextContent("Choose File");
  });

  it("upload file button is hidden on load", () => {
    // Arrange
    render(<FileUpload />);
    const fileUploadButton = screen.queryByTestId("upload-file-button");

    // Assert
    expect(fileUploadButton).not.toBeInTheDocument();
  });

  it("accepted file formats label renders", () => {
    // Arrange
    render(<FileUpload />);
    const acceptedFileFormatsLabel = screen.getByTestId("file-format-label");

    // Assert
    expect(acceptedFileFormatsLabel).toBeInTheDocument();
  });

  it("correct accepted file formats label", () => {
    // Arrange
    render(<FileUpload />);
    const acceptedFileFormatsLabel = screen.getByTestId("file-format-label");

    // Assert
    expect(acceptedFileFormatsLabel).toHaveTextContent(
      "Accepted file upload formats:",
    );
  });

  it("accepted file formats list renders", () => {
    // Arrange
    render(<FileUpload />);
    const acceptedFileFormatsList = screen.getByTestId(
      "accepted-file-formats-list",
    );

    // Assert
    expect(acceptedFileFormatsList).toBeInTheDocument();
  });

  it("correct accepted file formats list content", () => {
    // Arrange
    render(<FileUpload />);
    const acceptedFileFormatsList = screen.getByTestId(
      "accepted-file-formats-list",
    );
    const fileFormats = [".mp3", ".m4a", ".wav", ".webm"];

    // Assert
    fileFormats.forEach((format) => {
      expect(acceptedFileFormatsList).toHaveTextContent(format);
    });
  });
});
