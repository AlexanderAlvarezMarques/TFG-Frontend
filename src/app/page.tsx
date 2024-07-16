import React from 'react';
import { Suspense } from "react";
import SearchReserves from "@/components/shared/SearchBar/SearchReserves";
import Image from "next/image";
import Link from "next/link";
import SportCenterService from "@/services/api/sportCenter/SportCenterService";
import FormatTextTools from "@/utils/FormatTextTools";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationPin} from "@fortawesome/free-solid-svg-icons";

import sp1Image from "@/assets/images/sportCenters/sp_001.jpg";
import sp2Image from "@/assets/images/sportCenters/sp_002.jpg";
import sp3Image from "@/assets/images/sportCenters/sp_003.jpg";
import sp4Image from "@/assets/images/sportCenters/sp_004.jpg";

import tournament1Image from "@/assets/images/tournaments/t_01.jpg";
import tournament2Image from "@/assets/images/tournaments/t_02.jpg";
import tournament3Image from "@/assets/images/tournaments/t_03.webp";

// CSS
import '@/assets/sass/pages/home.scss';

export default async function Home() {

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=`;
    const sportCenterTopVisited: SportCenterTopVisited[] = await SportCenterService.getTopReserveSportCenterList();

    const images = [sp1Image, sp2Image, sp3Image, sp4Image]

    return (
        <>
            <div className={`searchEngine`}>
                <Suspense>
                    <SearchReserves page={1} itemsPerPage={10} action={undefined} />
                </Suspense>
            </div>

            {/* sport centers top visited */}
            {
                sportCenterTopVisited.length > 0 && (
                    <section>
                        <div className={`parallax parallax_1`}>
                            <h2>Club deportivos mas visitados</h2>
                        </div>
                        <div className={`content`}>
                            {
                                sportCenterTopVisited.map((sportCenter: SportCenterTopVisited) => {

                                    const fullAddress = `${sportCenter.street}, ${sportCenter.city}, ${sportCenter.province}, ${sportCenter.country}, ${sportCenter.postal_code}`;
                                    const encodedUrl = encodeURI(`${mapsUrl}${fullAddress}`);

                                    return (
                                        <article key={sportCenter.id}  className={`shadow-lg`}>
                                            <Image src={images[sportCenter.id % images.length]} alt={'Sport center image'}/>
                                            <div className={'border-bottom'}></div>
                                            <h3>{sportCenter.name}</h3>
                                            <p>
                                                <FontAwesomeIcon icon={faLocationPin} className={'icon'}/>
                                                <Link
                                                    href={encodedUrl}
                                                    target={`_blank`}>
                                                    {`${sportCenter.street}, ${FormatTextTools.capitalizeFirstChar(sportCenter.city)}, ${FormatTextTools.capitalizeFirstChar(sportCenter.province)}`}
                                                </Link>
                                            </p>
                                        </article>
                                    )

                                })
                            }
                        </div>
                    </section>
                )
            }

            {/* Tournaments */}
            <section className={`tournaments`}>
                <div className={`parallax parallax_2`}>
                    <h2>Torneos</h2>
                </div>
                <div className={`content`}>
                    <article>
                        <Image src={tournament1Image} alt={`Padel tournament`} className={`shadow-lg`}/>
                    </article>
                    <article>
                        <Image src={tournament2Image} alt={`Padel tournament`} className={`shadow-lg`}/>
                    </article>
                    <article>
                        <Image src={tournament3Image} alt={`Padel tournament`} className={`shadow-lg`}/>
                    </article>
                </div>
            </section>
        </>
    );
}
