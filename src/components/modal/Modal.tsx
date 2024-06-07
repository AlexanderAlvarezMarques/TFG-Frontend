'use client'

import React, {MouseEventHandler, ReactEventHandler, ReactNode, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
    children: ReactNode,
    onClose: () => void,
    target?: string
}

const Modal = ({ children, onClose, target = "rootModal" }: ModalProps) => {

    const [targetElement, setTargetElement] = useState<HTMLElement|null>(null);

    const handleCloseClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        onClose();
    }

    useEffect(() => {
        const htmlTarget = document.getElementById(target);
        if (htmlTarget) {
            setTargetElement(htmlTarget);
        }

    }, [target]);

    return !targetElement ? (
        <></>
    ) : (
        <div className={'modal-overlay'}>
            <div className={'modal-wrapper'}>
                <div className="modal-header">
                    <span className={'modal-close'} onClick={handleCloseClick}>
                        <FontAwesomeIcon icon={faClose} />
                    </span>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;
