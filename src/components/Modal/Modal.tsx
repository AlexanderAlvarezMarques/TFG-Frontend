import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

type Props = {
    children: ReactNode,
    onClose: Function
}

export default function Modal({ children, onClose }: Props) {

    const handleCloseClick = (e: any) => {
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

    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root")!);
}
