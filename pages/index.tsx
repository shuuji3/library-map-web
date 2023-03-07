import Head from 'next/head'

import { Wrapper } from '@googlemaps/react-wrapper'
import { useEffect, useRef } from 'react'

function LibraryMap({ center, zoom }: { center: google.maps.LatLngLiteral; zoom: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    })
  })

  return <div ref={ref} id="map" style={{ width: '100vw', height: '100vh' }} />
}

export default function Home() {
  const center = { lat: 35.5, lng: 140 }
  const zoom = 10

  return (
    <>
      <Head>
        <title>Library Map</title>
        <meta
          name="description"
          content="Library Maps - Let's find your favorite libraries around you where you can read great books and learn everything!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
        <LibraryMap center={center} zoom={zoom} />
      </Wrapper>
    </>
  )
}
