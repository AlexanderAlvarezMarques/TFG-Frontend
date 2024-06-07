type StorageState = {
    user: User,
    authorization: AuthToken,
    masterData: MasterStorage
}

type AuthToken = {
    token: string,
    refresh_token: string,
    isLogged: boolean
}
