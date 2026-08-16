// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Google Analytics is loaded as a global script in public/index.html and
// isn't present in the jsdom test environment.
global.ga = jest.fn();
