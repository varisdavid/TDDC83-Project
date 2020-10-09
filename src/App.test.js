import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders patient management', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText("Patient management");
  expect(linkElement).toBeInTheDocument();
});
