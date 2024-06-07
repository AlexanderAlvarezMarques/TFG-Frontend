// enums/UserDashboardFilterEnum.ts
export const UserDashboardFilterEnum = {
    ALL: "ALL",
    ACTIVE_GAMES: "AG",
    HISTORY_GAMES: "HG",
    ACTIVE_RESERVES: "AR",
    HISTORY_RESERVES: "HR",
} as const;

export type UserDashboardFilterEnumType = typeof UserDashboardFilterEnum[keyof typeof UserDashboardFilterEnum];
