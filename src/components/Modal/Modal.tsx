import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

type Props = {
    children: ReactNode,
    onClose: () => void,
    target?: string,
}

export default function Modal({ children, onClose, target = "modal-root" }: Props) {

    const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const targetEl = document.getElementById(target);
        if (targetEl) {
            setTargetElement(targetEl);
        }
    }, [target]);

    if (!targetElement) {
        return null; // Render nothing if target element is not found
    }

    const handleCloseClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        onClose();
    }

    const modalContent = (
        <div className={'modal-overlay'}>
            <div className={'modal-wrapper'}>
                <div className="modal-header">
                    <span className={'modal-close'} onClick={handleCloseClick}>
                        x
                    </span>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, targetElement);
}
