type PaginationConfig = {
    page: number,
    itemsPerPage: number,
    action?: Function
}

type Pagination = {
    currentPage: number,
    previousPage: number,
    nextPage: number,
    maxPage: number,
    minPage: number,
    itemsPerPage: number
}

type SearchResult<T> = {
    data: T[],
    pagination: Pagination
}
