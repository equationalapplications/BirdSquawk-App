import styles from '../styles/Home.module.css'
import ListPeeps from "./ListPeeps";
import CreatePeep from "./CreatePeep";

const ListSquawks = ({ myData, refreshData }) => {

  const renderSquawks = Object.values(myData).map((squawk) => {
    return (
      <div
        className={styles.card}
        key={squawk.squawkId}
      >
        <h1>Squawk</h1>
        <p>{squawk.squawk}</p>
        <ListPeeps peeps={squawk.peeps} />
        <CreatePeep squawkId={squawk.squawkId} refreshData={refreshData} myData={myData} />
      </div>
    );
  });

  return (
    <div>
      {renderSquawks}
    </div>
  );
};

export default ListSquawks;