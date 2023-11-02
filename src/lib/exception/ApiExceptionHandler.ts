function isCustomError(error: any): error is CustomError {
    return ('errorCode' in error);
}

export function processError(status: number, error: object) {

    console.log("ERROR:")
    console.log(error)
    if (isCustomError(error)) {
        const customError: CustomError = error as CustomError
        processCustomError(customError)
    }

    // console.log(error)
    throw new Error("An error occurred")

}

function processCustomError(error: CustomError) {
    throw new Error(error.title)
}
