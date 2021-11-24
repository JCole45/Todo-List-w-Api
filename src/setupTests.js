// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {configure} from "enzyme"
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


configure({ adapter: new Adapter() });

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  global.matchMedia = global.matchMedia || function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

  global.matchMedia = global.matchMedia || function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

  Object.defineProperty(window, 'matchMedia', {
    value: () => {
      return {
        matches: false,
        addListener: () => {},
        removeListener: () => {}
      };
    }
})