import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bird Squawk App</title>
        <meta name="description" content="Example Microsevices App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Bird Squawk - Name: {data.name}, Age: {data.age}
        </h1>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.agify.io?name=Birdy`)
  const data = await res.json()
  console.log(data);

  // Pass data to the page via props
  return { props: { data } }
}

export default Home;