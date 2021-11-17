import { useState } from "react";
import axios from "axios";
import styles from '../styles/Home.module.css';

const CreateSquawk = ({ myData, refreshData }) => {

  const [squawk, setSquawk] = useState("");

  const onSubmit = (event) => {

    event.preventDefault();

    axios.post("/api/birdsquawk", { squawk: squawk })
      .then(res => {
        res.data["peeps"] = [];
        const newData = Object.assign([], myData);
        newData.push(res.data);
        refreshData(newData);
      })
      .catch(err => console.log(err));

    setSquawk("");

  };

  const onChange = (event) => {
    setSquawk(event.target.value);
  };


  return (
    <div className={styles.card}>
      <h1>Create a Squawk</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="squawk"
          placeholder="Squawk"
          value={squawk}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Create Squawk"
        />
      </form>
    </div>
  );
}

export default CreateSquawk;