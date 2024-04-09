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

// Cleans up the DOM after each test to ensure a clean environment.
afterEach(() => {
  cleanup();
});

test("whole file upload component renders", () => {
  // Arrange
  render(<FileUpload />);
  const fileUploadElement = screen.getByTestId("upload");

  // Assert
  expect(fileUploadElement).toBeInTheDocument();
});

test("heading renders", () => {
  // Arrange
  render(<FileUpload />);
  const headingElement = screen.getByTestId("upload-heading");

  // Assert
  expect(headingElement).toBeInTheDocument();
});

test("correct heading content", () => {
  // Arrange
  render(<FileUpload />);
  const headingElement = screen.getByTestId("upload-heading");

  // Assert
  expect(headingElement.textContent).toBe("Upload");
});

test("selected file name element renders", () => {
  // Arrange
  render(<FileUpload />);
  const fileNameElement = screen.getByTestId("file-name");

  // Assert
  expect(fileNameElement).toBeInTheDocument();
});

test("correct selected file name content when no file chosen", () => {
  // Arrange
  render(<FileUpload />);
  const fileNameElement = screen.getByTestId("file-name");

  // Assert
  expect(fileNameElement.textContent).toBe("No file chosen");
});

test("choose file button renders", () => {
  // Arrange
  render(<FileUpload />);
  const chooseFileButton = screen.getByTestId("choose-file-button");

  // Assert
  expect(chooseFileButton).toBeInTheDocument();
});

test("correct choose file button label when NO file is selected", () => {
  // Arrange
  render(<FileUpload />);
  const chooseFileButton = screen.getByTestId("choose-file-button");

  // Assert
  expect(chooseFileButton).toHaveTextContent("Choose a file");
});

test.skip("correct choose file button label when file is selected", () => {
  // TODO: Implement test to check if the button label changes "Change file" when a file is selected
});

test.skip("choose file button is NOT shown when file is uploading", () => {
  // TODO: Implement test to check that the choose/change file button is not shown when a file is uploading
});

test.skip("upload file button renders when a file is selected", () => {
  // TODO: Implement test to check that the upload file button renders when a valid file is selected.
});

test.skip("correct upload file button label", () => {
  // TODO: Implement test to check that when rendered, the upload file button label is correct ("Upload")
});

test("upload file button is hidden on load", () => {
  // Arrange
  render(<FileUpload />);
  const fileUploadButton = screen.queryByTestId("upload-file-button");

  // Assert
  expect(fileUploadButton).not.toBeInTheDocument();
});

test.skip("upload file button is hidden when file is uploading", () => {
  // TODO: Implement test to check if the button is disabled when a file is uploading
});

test("accepted file formats label renders", () => {
  // Arrange
  render(<FileUpload />);
  const acceptedFileFormatsLabel = screen.getByTestId("file-format-label");

  // Assert
  expect(acceptedFileFormatsLabel).toBeInTheDocument();
});

test("correct accepted file formats label", () => {
  // Arrange
  render(<FileUpload />);
  const acceptedFileFormatsLabel = screen.getByTestId("file-format-label");

  // Assert
  expect(acceptedFileFormatsLabel).toHaveTextContent(
    "Accepted file upload formats:",
  );
});

test("accepted file formats list renders", () => {
  // Arrange
  render(<FileUpload />);
  const acceptedFileFormatsList = screen.getByTestId(
    "accepted-file-formats-list",
  );

  // Assert
  expect(acceptedFileFormatsList).toBeInTheDocument();
});

test("correct accepted file formats list content", () => {
  // Arrange
  render(<FileUpload />);
  const acceptedFileFormatsList = screen.getByTestId(
    "accepted-file-formats-list",
  );
  const fileFormats = [".mp3", ".m4a", ".wav"];

  // Assert
  fileFormats.forEach((format) => {
    expect(acceptedFileFormatsList).toHaveTextContent(format);
  });
});

// Snapshot test
test("matches snapshot", () => {
  // Arrange
  const tree = renderer.create(<FileUpload />).toJSON();

  // Assert
  expect(tree).toMatchSnapshot();
});
