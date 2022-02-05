import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsWidget from './NewsWidget';

test('Correct title present', () => {
  render(<NewsWidget />);
  const title = screen.getByText(/News/i);
  expect(title).toBeInTheDocument();
});

test('Filter dropdown present', () => {
  render(<NewsWidget />);
  const filterDropDown = screen.getByText(/Filter By Source/i);
  expect(filterDropDown).toBeInTheDocument();
});

test('Show more button present', () => {
  render(<NewsWidget />);
  const showMoreButton = screen.getByRole('button'); // actual button not just text
  expect(showMoreButton).toBeInTheDocument();
});

test('0 articles are initially present (before api call)', () => {
  render(<NewsWidget />);
  const articlesContainer = screen.getByTestId('articles');
  expect(articlesContainer.childNodes.length).toEqual(0);
});

test('5 articles are present after api call', async () => {
  render(<NewsWidget />);
  const articlesContainer = screen.getByTestId('articles');
  await waitFor(() => expect(articlesContainer.childNodes.length).toBeGreaterThan(0));
  expect(articlesContainer.childNodes.length).toEqual(5);
});

test('Clicking Show More button should reveal 5 more titles', async () => {
  render(<NewsWidget />);
  const articlesContainer = screen.getByTestId('articles');
  await waitFor(() => expect(articlesContainer.childNodes.length).toBeGreaterThan(0));
  expect(articlesContainer.childNodes.length).toEqual(5);

  const showMoreButton = screen.getByText(/Show More/i);
  userEvent.click(showMoreButton);
  expect(articlesContainer.childNodes.length).toEqual(10);
});

test('Filter by Source should allow you to filter articles by their source', () => {
  // render(<NewsWidget />);
  // const filterDropDown = screen.getByText(/Filter By Source/i);
  // expect(filterDropDown).toBeInTheDocument();
});

// button colour
// article title correct
// article title link
// article
