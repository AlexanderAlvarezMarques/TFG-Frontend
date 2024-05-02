import React, {useState} from "react";

// CSS
import styles from '@/assets/sass/components/messagePopUp.module.scss'

interface MessagePopUpProps {
    msg: string
    onClose: Function,
    bandColor: string
}

const getBandColorClassName = (color: string) => {
    const bandColors: { [key: string]: string } = {
        GREEN: styles.greenBand,
        RED: styles.redBand,
        BLUE: styles.blueBand
    };

    return bandColors[color] || '';
}

const MessagePopUp = ({ msg, bandColor, onClose }: MessagePopUpProps) => {

    // setTimeout(() => {
    //     onClose(false);
    // }, 5000);

    return (
        <div className={`${styles.messagePopUp}`}>
            {/* Band color */}
            <div className={`${styles.bandColor} ${getBandColorClassName(bandColor)}`}></div>

            {/* Content */}
            <div className={`${styles.content}`}>
                {msg}

                {/* Close button */}
                <button onClick={onClose.bind(this, false)} className={`btn btn-primary ml-2`}>Cerrar</button>
            </div>

        </div>
    )
}

export default MessagePopUp;
