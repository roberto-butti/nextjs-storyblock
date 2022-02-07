import Head from 'next/head'
import Image from 'next/image'
import CallToAction from '../components/CallToAction'
import styles from '../styles/Home.module.css'

function Home({ctas}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {ctas.map((cta, i ) => (
            <CallToAction key={i}
            {...cta}
            />
          ))}
        </div>
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
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {

  const ctas = [
    {
      url: "https://nextjs.org/docs",
      title: "Documentation",
      description: "Find in-depth information about Next.js features and API."
    },
    {
      url: "https://nextjs.org/learn",
      title: "Learn",
      description: "Learn about Next.js in an interactive course with quizzes!"
    },
    {
      url: "https://github.com/vercel/next.js/tree/master/examples",
      title: "Examples",
      description: "Discover and deploy boilerplate example Next.js projects."
    },
    {
      url: "https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
      title: "Deploy",
      description: "Instantly deploy your Next.js site to a public URL with Vercel."
    },

    
  ]

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      ctas,
    },
  }
}
export default Home