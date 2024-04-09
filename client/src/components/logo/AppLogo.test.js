import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import AppLogo from "./AppLogo";

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
