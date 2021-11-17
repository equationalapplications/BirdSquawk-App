import { useState } from "react";
import styles from '../styles/Home.module.css'
import CreateSquawk from '../components/CreateSquawk'
import ListSquawks from '../components/ListSquawks'

function Home({ data }) {

  const [myData, setMyData] = useState(data);

  const refreshData = (newData) => {
    setMyData(newData);
    console.log("data refreshed ", newData);
  };

  return (
    <div className={styles.content}>
      <CreateSquawk myData={myData} refreshData={refreshData} />
      <ListSquawks myData={myData} refreshData={refreshData} />
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://query-service:5200/api/query`)
  const data = await res.json()

  console.log("server side props ", data);

  // Pass data to the page via props
  return { props: { data } }
}

export default Home;