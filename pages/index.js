import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Visualizer from '../components/Visualizer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Dijkstra Grid</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <Header />
        <Visualizer />
      </main>

      <Footer />
  </>
  )
}
