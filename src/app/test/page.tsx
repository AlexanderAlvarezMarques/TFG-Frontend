'use client'

import Dashboard from "@/components/app/Dashboard/Dashboard";
import {useState} from "react";
import {log} from "node:util";

interface PageDataType {
    data: ReserveDetails[],
    pagination: Pagination
}

export default function Page() {

    const [searchType, setSearchType] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(2);

    const [pageData, setPageData] = useState<PageDataType>();

    const updateSearchType = () => {
        setSearchType(searchType === 4 ? 1 : searchType + 1);
    }

    const action = (data: any) => {
        console.log(data.data);
        setPageData(data);
    }

    return (
        <>
            
            <button onClick={updateSearchType} className={`btn btn-primary`}>Search type</button>
            <button onClick={() => {setPage(page + 1)}} className={`btn btn-primary`}>Page</button>
            <Dashboard searchType={searchType} page={page} itemsPerPage={itemsPerPage} action={action} />

            {
                pageData?.data && (
                    <>
                        <p>Inside</p>
                        {pageData.data.map((reserve) => {
                            return <p key={reserve.id}>Id: {reserve.id}</p>
                        })}
                    </>
                )
            }
        </>
    )

}
