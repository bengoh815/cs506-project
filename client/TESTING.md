# Testing React Components

### `npm test`

Launches the test runner in the interactive watch mode.

## Resource Links:

Guide to Testing React Components: https://www.freecodecamp.org/news/testing-react-hooks/ \
React Testing Library: https://testing-library.com/docs/react-testing-library/intro \
JEST (JavaScript) Testing: https://jestjs.io/

## Shallow vs Mount Testing

### Shallow Testing:

- Typically used for unit testing
- Only renders the single component we are testing (does NOT render children components)
- Allows for testing component in isolation

### Mount Testing:

- Typically used for integration testing
- Actually executes HTML, CSS and JS code in simulated way.
- Simulated = no render of UI but acts a simulated browser excuting code in the background
- Slower than shallow testing

## Unit vs Integration vs End to End Testing

### Unit Testing:

- Testing isolated part of the app
- Usually done in combination with shallow rendering
- Example: A component rendering with default props

### Integration Testing:

- Testing if different parts work or integrate with each other
- Typically done with mounting or rendering
- Example: Child component updating context state in parent

### End to End Testing:

- Typically a multi step test combining multiple unit & integration tests into one big test.
- Usually very little is mocked or stubbed.
- Test done in a simulated browser
- Example: Testing an entire authentication flow
