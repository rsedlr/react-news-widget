import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsWidget from './NewsWidget';

async function waitForAPICall(articlesContainer: HTMLElement) {
  // wait for api call to complete
  await waitFor(() => expect(articlesContainer.childNodes.length).toBeGreaterThan(0), {
    timeout: 5000, // allow enough time for api call to finish
  });
}

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
  await waitForAPICall(articlesContainer);
  expect(articlesContainer.childNodes.length).toEqual(5);
});

test('Clicking Show More button should reveal 5 more titles', async () => {
  render(<NewsWidget />);
  const articlesContainer = screen.getByTestId('articles');
  await waitForAPICall(articlesContainer);
  expect(articlesContainer.childNodes.length).toEqual(5);

  const showMoreButton = screen.getByText(/Show More/i);
  userEvent.click(showMoreButton);
  expect(articlesContainer.childNodes.length).toEqual(10);
});

test('Dates are present', async () => {
  render(<NewsWidget />);
  const articlesContainer = screen.getByTestId('articles');
  await waitForAPICall(articlesContainer);

  const dates = screen.getAllByTestId('article-date');
  expect(dates.length).toEqual(5);
});

test('Dates are in correct format', async () => {
  render(<NewsWidget />);
  const articlesContainer = screen.getByTestId('articles');
  await waitForAPICall(articlesContainer);

  const dates = screen.getAllByTestId('article-date');
  dates.forEach(date => {
    const parts = date.innerHTML.split('/');
    expect(parts.length).toEqual(3);
    expect(parts[0].length).toEqual(2); // day should be 2 digits
    expect(parts[1].length).toEqual(2); // month should be 2 digits
    expect(parts[2].length).toEqual(4); // year should be 4 digits
  });
});

test('Sources are present', async () => {
  render(<NewsWidget />);
  const articlesContainer = screen.getByTestId('articles');
  await waitForAPICall(articlesContainer);

  const sources = screen.getAllByTestId('article-source');
  expect(sources.length).toEqual(5);
});

test('Links to articles are present', async () => {
  render(<NewsWidget />);
  const articlesContainer = screen.getByTestId('articles');
  await waitForAPICall(articlesContainer);

  const sources = screen.getAllByTestId('article-source');
  expect(sources.length).toEqual(5);
});

// test('Links to articles are correct', async () => {
//  // Other than making another API request in the test method and comparing the links I'm
//  // not sure how to go about this, so I have left it out for now.
// });

test('Filter by Source dropdown is populated', async () => {
  render(<NewsWidget />);
  const articlesContainer = screen.getByTestId('articles');
  await waitForAPICall(articlesContainer);

  const filterDropDown = screen.getByTestId('article-dropdown');
  expect(filterDropDown.childNodes.length).toBeGreaterThan(1);
});

test('Filter by Source only displays articles by the correct source', async () => {
  render(<NewsWidget />);
  const articlesContainer = screen.getByTestId('articles');
  await waitForAPICall(articlesContainer);

  const filterDropDown = screen.getByTestId('article-dropdown');
  let options = screen.getAllByTestId('dropdown-option');
  userEvent.selectOptions(filterDropDown, options[0].innerHTML);

  const sources = screen.getAllByTestId('article-source');
  sources.forEach(source => {
    // check all displayed articles have the same source as the selection
    expect(source.innerHTML).toEqual(options[0].innerHTML);
  });
});
