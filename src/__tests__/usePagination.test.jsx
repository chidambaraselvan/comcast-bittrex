import { renderHook } from "@testing-library/react";
import { usePagination } from "../usePagination";

test('renders use pagination hook', () => {
    const config = {
        totalCount: 10,
        siblingCount: 2,
        currentPage: 1,
        pageSize: 10,
    }
    const { result } = renderHook(() =>
        usePagination(config)
    );
    expect(result.current).toEqual(
        [1]
    );
});

test('renders use pagination hook with number of pages lower than siblings', () => {
    const config = {
        totalCount: 60,
        siblingCount: 1,
        currentPage: 1,
        pageSize: 10,
    }
    const { result, rerender } = renderHook(() =>
        usePagination(config)
    );
    expect(result.current).toEqual(
        [1,2,3,4,5,6]
    );
    rerender({
        totalCount: 60,
        siblingCount: 3,
        currentPage: 2,
        pageSize: 10,
    })
    expect(result.current).toEqual(
        [1,2,3,4,5,6]
    );
});

test('renders use pagination hook with number of pages with dots on left', () => {
    const config = {
        totalCount: 70,
        siblingCount: 1,
        currentPage: 5,
        pageSize: 10,
    }
    const { result } = renderHook(() =>
        usePagination(config)
    );
    expect(result.current).toEqual(
        [1,'dots',3,4,5,6,7]
    );
});

test('renders use pagination hook with number of pages with dots on right', () => {
    const config = {
        totalCount: 70,
        siblingCount: 1,
        currentPage: 2,
        pageSize: 10,
    }
    const { result } = renderHook(() =>
        usePagination(config)
    );
    expect(result.current).toEqual(
        [1,2,3,4,5,'dots',7]
    );
});

test('renders use pagination hook with number of pages with dots on both side', () => {
    const config = {
        totalCount: 80,
        siblingCount: 1,
        currentPage: 4,
        pageSize: 10,
    }
    const { result } = renderHook(() =>
        usePagination(config)
    );
    expect(result.current).toEqual(
        [1,'dots',3,4,5,'dots',8]
    );
});