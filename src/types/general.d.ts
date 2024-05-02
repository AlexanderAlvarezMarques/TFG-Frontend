type CustomError = {
    errorCode: string,
    title: string,
    details: string
}

type Pagination = {
    currentPage: number,
    previousPage: number,
    nextPage: number,
    maxPage: number,
    minPage: number,
    itemsPerPage: number
}
