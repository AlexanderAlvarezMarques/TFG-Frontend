'use client'

import React, {useState} from "react";
import Modal from "@/components/modal/Modal";

type CreateEditSportCenterProps = {
    sportCenter?: SportCenter
    action: Function
}

const CreateEditSportCenterModal: React.FC<CreateEditSportCenterProps> = ({sportCenter, action}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!isModalOpen) {
        return <button className={`btn btn-success`} onClick={() => setIsModalOpen(true)}>Crear centro deportivo</button>
    }

    return (
        <Modal onClose={() => setIsModalOpen(false)} >
            <form className={`form createEditSportCenter`}>

                {/* Name */}
                <div className="formGroup">
                    <label htmlFor=""></label>
                    <input type="text" name="name" id="name" />
                </div>

                {/* city */}
                <div className="formGroup">
                    <label htmlFor=""></label>
                    <input type="text" name="city" id="city" />
                </div>

                {/* Street */}
                <div className="formGroup">
                    <label htmlFor=""></label>
                    <input type="text" name="street" id="street" />
                </div>

                {/* N Courts */}
                <div className="formGroup">
                    <label htmlFor="">Nº total de pistas/canchas</label>
                    <input type="text" name="nCourts" id="nCourts" disabled={true}/>
                </div>

            </form>
        </Modal>
    )
}

export default CreateEditSportCenterModal;
