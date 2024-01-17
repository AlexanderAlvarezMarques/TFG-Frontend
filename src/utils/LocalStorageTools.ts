import MasterApiTool from "@/utils/api/MasterApiTool";

type MasterData = {
    [key: string]: any
}

export async function readAndSetMasterData() {
    const masterData = MasterApiTool.getMasterData();

    masterData.then((data: MasterData) => {
        Object.entries(data).forEach(([key, value]) => {
            localStorage.setItem(key, JSON.stringify(value));
        })
    }).catch((error) => {
        console.log(error);
    });
}

const readMasterData = () => {
    const currentTime = new Date();
    const lastUpdate = localStorage.getItem('lastMasterDataUpdate') ?? "";
    const timeDiff = Math.abs(currentTime.getTime() - new Date(lastUpdate).getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (!lastUpdate || diffDays >= 1) {
        readAndSetMasterData();
        localStorage.setItem('lastMasterDataUpdate', currentTime.toString());
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    readMasterData
}
