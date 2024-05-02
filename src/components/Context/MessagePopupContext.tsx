import React, {createContext, useContext, useState} from "react";
import styles from "@/assets/sass/components/messagePopUp.module.scss";

interface MessagePopupContextType {
    isOpen: boolean;
    message: string;
    bandColor: string;
    openPopup: (message: string, color: string) => void;
    closePopup: () => void;
}

const defaultValue: MessagePopupContextType = {
    isOpen: false,
    message: '',
    bandColor: '',
    openPopup: () => {},
    closePopup: () => {}
};

export const MessageBandColorEnum = {
    RED: "RED",
    GREEN: "GREEN",
    BLUE: "BLUE",
    YELLOW: "YELLOW",
    NONE: ""
}

const MessagePopupContext = createContext<MessagePopupContextType>(defaultValue);

interface MessagePopupProps {
    children: React.ReactNode
}

const getBandColorClassName = (color: string) => {
    const bandColors: { [key: string]: string } = {
        GREEN: styles.greenBand,
        RED: styles.redBand,
        BLUE: styles.blueBand
    };

    return bandColors[color] || '';
}

export const MessagePopupProvider: React.FC<MessagePopupProps> = ({children}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [bandColor, setBandColor] = useState<string>(MessageBandColorEnum.NONE);

    const openMessagePopup = (message: string, color: string) => {
        setMessage(message);
        setBandColor(color);
        setIsOpen(true);

        setTimeout(closeMessagePopup, 5000);
    }

    const closeMessagePopup = () => {
        setMessage("message");
        setBandColor(MessageBandColorEnum.NONE);
        setIsOpen(false);
    }

    return (
        <MessagePopupContext.Provider value={{isOpen, message, bandColor, openPopup: openMessagePopup, closePopup: closeMessagePopup}}>
            {children}

            {
                isOpen &&
                <div className={`${styles.messagePopUp}`}>
                    {/* Band color */}
                    <div className={`${styles.bandColor} ${getBandColorClassName(bandColor)}`}></div>

                    {/* Content */}
                    <div className={`${styles.content}`}>
                        {message}

                        {/* Close button */}
                        <button onClick={() => setIsOpen(false)} className={`btn btn-primary ml-2`}>Cerrar</button>
                    </div>
                </div>
            }

        </MessagePopupContext.Provider>
    )
}

export const useMessagePopup = () => useContext(MessagePopupContext);
