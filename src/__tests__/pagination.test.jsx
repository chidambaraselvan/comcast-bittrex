import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../components/pagination/pagination';

test('render and not render pagination', () => {
    const { rerender } = render(<Pagination onPageChange={jest.fn()} totalCount={20} siblingCount={2} currentPage={1} pageSize={10} className={'pagination-bar'} />);
    const listElement = screen.getByTestId('pagination-bar');
    expect(listElement).toBeInTheDocument();
    rerender(<Pagination onPageChange={jest.fn()} totalCount={20} siblingCount={2} currentPage={0} pageSize={10} className={'pagination-bar'} />)
});

test('on next and previous click on pagination', () => {
    render(<Pagination onPageChange={jest.fn()} totalCount={30} siblingCount={2} currentPage={1} pageSize={10} className={'pagination-bar'} />);
    const nextElement = screen.getByTestId('pagination-item-next');
    expect(nextElement).toBeInTheDocument();
    fireEvent.click(nextElement);
    const previousElement = screen.getByTestId('pagination-item-previous');
    expect(previousElement).toBeInTheDocument();
    fireEvent.click(previousElement);
});

test('on clicking page number on pagination', () => {
    render(<Pagination onPageChange={jest.fn()} totalCount={80} siblingCount={1} currentPage={4} pageSize={10} className={'pagination-bar'} />);
    const pageElement = screen.getByTestId('pagination-item-1');
    expect(pageElement).toBeInTheDocument();
    fireEvent.click(pageElement)
});

test('showing dots on pagination', () => {
    render(<Pagination onPageChange={jest.fn()} totalCount={80} siblingCount={1} currentPage={4} pageSize={10} className={'pagination-bar'} />);
    const dotElement = screen.getAllByTestId('pagination-item-dots')[0];
    expect(dotElement).toBeInTheDocument();
});