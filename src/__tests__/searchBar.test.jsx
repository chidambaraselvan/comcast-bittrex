import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '../components/searchBar/searchBar';

test('renders search input', () => {
  render(<SearchBar onSearch={jest.fn()} />);
  const inputElement = screen.getByPlaceholderText(/Search here/i);
  expect(inputElement).toBeInTheDocument();
});

test('renders search input change value', () => {
  render(<SearchBar onSearch={jest.fn()} />);
  const inputElement = screen.getByPlaceholderText(/Search here/i);
  fireEvent.change(inputElement, { target: { value: 'test' } })
  expect(inputElement.value).toBe('test')
});

test('renders search input keydown value', () => {
  const onSearch = jest.fn();
  render(<SearchBar onSearch={onSearch} />);
  const inputElement = screen.getByPlaceholderText(/Search here/i);
  fireEvent.change(inputElement, { target: { value: 'test' } })
  fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
  expect(onSearch).toHaveBeenCalledWith('test')
  fireEvent.keyDown(inputElement, { key: 'A', code: 'KeyA' });
});

test('renders search input clear value', () => {
  const onSearch = jest.fn();
  render(<SearchBar onSearch={onSearch} />);
  const inputElement = screen.getByPlaceholderText(/Search here/i);
  fireEvent.change(inputElement, { target: { value: 'test' } })
  fireEvent.input(inputElement);
  expect(onSearch).toHaveBeenCalledWith('')
});