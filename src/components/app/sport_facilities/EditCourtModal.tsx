import FormatTextTools from "@/utils/FormatTextTools";
import React, {FormEvent, useState} from "react";
import {useSelector} from "react-redux";

import "@/assets/sass/components/Modal/editCourtModal.scss";
import CourtService from "@/services/api/sportCenter/CourtService";
import {MessageBandColorEnum, useMessagePopup} from "@/components/Context/MessagePopupContext";

type EditCourtProps = {
    data: Court
    onClose: Function
}

const EditCourtModal: React.FC<EditCourtProps> = ({ data, onClose}) => {

    const sports = useSelector((state: StorageState) => state.masterData.sports);
    const [court, setCourt] = useState<Court>(data);
    const { openPopup } = useMessagePopup();

    const onCloseAction = () => {
        onClose(null);
    }

    const saveAction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await CourtService.updateCourt(court.id, court.number, court.sport, court.enable);

        if (response !== null) {
            openPopup("Pista/cancha actualizada.", MessageBandColorEnum.GREEN);
            onClose(response);
        }
    }

    return data ? (
        <div className={`editModal`}>
            <div className={`content`}>
                <form className={``} onSubmit={saveAction}>
                    <div className="classGroup">
                        <label htmlFor="">Identificador:</label>
                        <input type="text" defaultValue={court.identifier} disabled={true}/>
                    </div>

                    <div className="classGroup">
                        <label htmlFor="">Deporte:</label>
                        <select
                            name=""
                            id=""
                            defaultValue={data.sport}
                            onChange={(e) => setCourt((prevState) => ({
                                ...prevState,
                                sport: e.target.value
                            }))}
                        >
                            {
                                sports.map((sport) =>
                                    <option key={sport.name} value={sport.name}>
                                        {FormatTextTools.capitalizeFirstChar(sport.name)}
                                    </option>
                                )
                            }
                        </select>
                    </div>

                    <div className="classGroup">
                        <label htmlFor="">Número:</label>
                        <input
                            type="number"
                            defaultValue={data.number}
                            onChange={(e) => setCourt((prevState) => ({
                                ...prevState,
                                number: Number(e.target.value)
                            }))}
                        />

                    </div>

                    <div className="classGroup">
                        <label htmlFor="">Activa:</label>
                        <input
                            type="checkbox"
                            className={`form-check-input`}
                            checked={court.enable}
                            onChange={(e) => setCourt((prevState) => ({
                                ...prevState,
                                enable: e.target.checked
                            }))}
                        />
                    </div>

                    <div className={`classGroup btnGroup`}>
                        <input type="submit" className={`btn btn-success`} value={`Guardar`}/>
                        <input type="button" className={`btn btn-danger`} value={`Cancelar`} onClick={onCloseAction}/>
                    </div>
                </form>
            </div>
        </div>
    ) : (<></>);

}

export default EditCourtModal;
