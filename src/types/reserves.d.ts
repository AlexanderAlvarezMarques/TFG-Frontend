import User from "@/types/user"
import SportTypeEnum from "@/enum/SportTypeEnum";
import ReserveStatusEnum from "@/enum/ReserveStatusEnum";

type Reserve = {
    id: number
    isOwner: boolean
    isParticipant: boolean
    isFull: boolean
    participantLimit: number
    startDate: string
    endDate: string
    sport: SportTypeEnum
    status: ReserveStatusEnum
    public: boolean
    averageRate: number
    court: Court
    reserveRates: ReserveRate[]
    participants?: ReserveParticipant[]
    owner?: User
    allowRate: boolean
}

type ReserveRate = {
    participant: User
    rate: number
}

type ReserveParticipant = {
    reserve: {
        id: number
        isOwner: boolean
        isFull: boolean
        isParticipant: boolean
    }
    participant: User
    status: string
}

type SearchReserveResult = SearchResult<Reserve>
