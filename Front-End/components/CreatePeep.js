import { useState } from "react";
import axios from "axios";
import styles from '../styles/Home.module.css'

const CreatePeep = ({ squawkId, refreshData, myData }) => {

    const [peep, setPeep] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post(`/api/peeps/${squawkId}`, { peep: peep })
            .then(res => {
                const newData = Object.assign([], myData);
                newData.forEach(squawk => {
                    if (squawk.squawkId === squawkId) {
                        squawk.peeps.push(res.data);
                    }
                });

                console.log("Create Peep newData ", newData);

                refreshData(newData);
            })
            .catch(err => console.log(err));
        setPeep("");
    };

    const onChange = (event) => {
        setPeep(event.target.value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="peep"
                    placeholder="Peep"
                    value={peep}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value="Create Peep"
                />
            </form>
        </div>
    );
}

export default CreatePeep;