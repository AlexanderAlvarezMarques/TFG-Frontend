const isAuthToken = (obj: any) =>
    'token' in obj
    && 'refresh_token' in obj

const isUser = (obj: any) =>
    "id" in obj
    && "username" in obj
    && "email" in obj
    && "roles" in obj
    && "language" in obj
    && "name" in obj
    && "surname" in obj
    && "nif" in obj

export { isAuthToken }
