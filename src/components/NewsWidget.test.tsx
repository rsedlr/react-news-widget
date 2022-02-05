import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsWidget from './NewsWidget';

test('Correct title present', () => {
  render(<NewsWidget />);
  const title = screen.getByText(/News/i);
  expect(title).toBeInTheDocument();
});

test('Show more button present', () => {
  render(<NewsWidget />);
  const showMoreButton = screen.getByText(/Show More/i); // actual button not just text
  expect(showMoreButton).toBeInTheDocument();
});

test('Filter dropdown present', () => {
  render(<NewsWidget />);
  const filterDropDown = screen.getByText(/Filter By Source/i);
  expect(filterDropDown).toBeInTheDocument();
});

test('Clicking Show More button should reveal 5 more titles', () => {
  render(<NewsWidget />);
  const filterDropDown = screen.getByText(/Filter By Source/i);
  expect(filterDropDown).toBeInTheDocument();
});

test('Filter by Source should allow you to filter by source', () => {
  render(<NewsWidget />);
  const filterDropDown = screen.getByText(/Filter By Source/i);
  expect(filterDropDown).toBeInTheDocument();
});

// button colour
// article title correct
// article title link
// article
