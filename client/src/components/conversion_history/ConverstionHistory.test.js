import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import ConversionHistory from "./ConversionHistory";

afterEach(() => {
    cleanup();
});

test("renders the ConversionHistory component", () => {
    render(<ConversionHistory />);

    // Use a more flexible text matcher to find the heading element
    expect(screen.getByRole("heading", { name: /conversion history/i })).toBeInTheDocument();
});

// Snapshot test to ensure UI changes are deliberate.
test("ConversionHistory component matches snapshot", () => {
    const tree = renderer.create(<ConversionHistory />).toJSON();

    expect(tree).toMatchSnapshot();
});

// Test file name sorting functionality
test("sorts conversion history by file name", () => {
    render(<ConversionHistory />);

    const fileNameColumn = screen.getByRole("columnheader", { name: /file/i });
    fireEvent.click(fileNameColumn);

    expect(screen.getByText("song9.mid")).toBeInTheDocument();
});


// Test file name sorting functionality
test("sorts conversion history by author name", () => {
    render(<ConversionHistory />);

    const authorNameColumn = screen.getByRole("columnheader", { name: /author/i });
    fireEvent.click(authorNameColumn);

    expect(screen.getByText("Alice")).toBeInTheDocument();
});


// Test date name sorting functionality
test("sorts conversion history by author name", () => {
    render(<ConversionHistory />);

    const dateColumn = screen.getByRole("columnheader", { name: /date/i });
    fireEvent.click(dateColumn);

    expect(screen.getByText("2024-03-10")).toBeInTheDocument();
});

// Test date name sorting functionality
test("sorts conversion history by author name", () => {
    render(<ConversionHistory />);

    const sizeColumn = screen.getByRole("columnheader", { name: /size/i });
    fireEvent.click(sizeColumn);

    expect(screen.getByText("0.9 MB")).toBeInTheDocument();
});

// Test pagination initial rows
test("displays correct number of items per page", () => {
    render(<ConversionHistory />);

    const items = screen.getAllByRole("row");
    expect(items.length).toBe(11);
});

// Test pagination switch button
test("displays correct items when changing pages", () => {
    render(<ConversionHistory />);

    // Attempt to find the "Next" button using a case-insensitive regex for the label
    const nextPageButton = screen.getByRole("button", { name: /2/i });
    fireEvent.click(nextPageButton);

    // After clicking next page, check if the correct items are displayed
    const itemsSecondPage = screen.getAllByRole("row");
    expect(itemsSecondPage.length).toBe(4); 
});

// Test the button number
test("counts the number of pages in the table", () => {
    render(<ConversionHistory />);

    const pageButtons = screen.getAllByRole("button", { name: /page/i });

    // Check if the number of page buttons matches the expected number of pages
    expect(pageButtons.length).toBe(4);
});