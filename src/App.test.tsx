import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('App contains NewsWidget', () => {
  render(<App />);
  const newsWidget = screen.getByTestId('news-container');
  expect(newsWidget).toBeInTheDocument();
});
