import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import ConversionHistory from "./ConversionHistory";

afterEach(() => {
    cleanup();
});

/**
 * Test 1: Render the ConversionHistory component.
 */
test("renders the ConversionHistory component", () => {
    render(<ConversionHistory />);

    expect(screen.getByRole("heading", { name: /conversion history/i })).toBeInTheDocument();
});

/**
 * Test 2: Snapshot test to ensure UI changes are deliberate.
 */
test("ConversionHistory component matches snapshot", () => {
    const tree = renderer.create(<ConversionHistory />).toJSON();

    expect(tree).toMatchSnapshot();
});

/**
 * Test 3: Test file name sorting functionality.
 */
test("sorts conversion history by file name", () => {
    render(<ConversionHistory />);

    const fileNameColumn = screen.getByRole("columnheader", { name: /file/i });
    fireEvent.click(fileNameColumn);

    expect(screen.getByText("song9.midi")).toBeInTheDocument();
});

/**
 * Test 4: Test author name sorting functionality.
 */
test("sorts conversion history by author name", () => {
    render(<ConversionHistory />);

    const authorNameColumn = screen.getByRole("columnheader", { name: /name/i });
    fireEvent.click(authorNameColumn);

    expect(screen.getByText("Alice")).toBeInTheDocument();
});

/**
 * Test 5: Test date sorting functionality.
 */
test("sorts conversion history by date", () => {
    render(<ConversionHistory />);

    const dateColumn = screen.getByRole("columnheader", { name: /date/i });
    fireEvent.click(dateColumn);

    expect(screen.getByText("2024-03-10")).toBeInTheDocument();
});

/**
 * Test 6: Test email sorting functionality.
 */
test("sorts conversion history by size", () => {
    render(<ConversionHistory />);

    const emailColumn = screen.getByRole("columnheader", { name: /email/i });
    fireEvent.click(emailColumn);
    fireEvent.click(emailColumn);

    expect(screen.getByText("bob@email.com")).toBeInTheDocument();
});

/**
 * Test 7: Test pagination initial rows.
 */
test("displays correct number of items per page", () => {
    render(<ConversionHistory />);

    const items = screen.getAllByRole("row");
    expect(items.length).toBe(11);
});

/**
 * Test 8: Test pagination rows after sort.
 */
 test("displays correct number of items per page", () => {
    render(<ConversionHistory />);
    const sizeColumn = screen.getByRole("columnheader", { name: /email/i });
    fireEvent.click(sizeColumn);

    const items = screen.getAllByRole("row");
    expect(items.length).toBe(11);
});


/**
 * Test 9: Test pagination switch button.
 */
test("displays correct items when changing pages", () => {
    render(<ConversionHistory />);

    const nextPageButton = screen.getByRole("button", { name: /2/i });
    fireEvent.click(nextPageButton);

    const itemsSecondPage = screen.getAllByRole("row");
    expect(itemsSecondPage.length).toBe(4);
});

/**
 * Test 10: Test the number of pages in the table.
 */
test("counts the number of pages in the table", () => {
    render(<ConversionHistory />);

    const pageButtons = screen.getAllByRole("button", { name: /page/i });

    expect(pageButtons.length).toBe(4);
});
