import type { NextApiRequest, NextApiResponse } from 'next'

type Library = {
  address: string
  category: string
  city: string
  distance: number
  faid: string | null
  formal: string
  geocode: string
  isil: string
  libid: string
  libkey: string
  post: string
  pref: string
  short: string
  systemid: string
  systemname: string
  tel: string
  url_pc: string
}

type APIError = {
  error: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Library[] | APIError>) {
  const { lat, lng } = req.query
  const url = `https://api.calil.jp/library?format=json&callback&appkey=${process.env.CALIL_API_KEY}&geocode=${lat},${lng}&limit=100`
  try {
    const libraries = await fetch(url).then((res) => res.json())
    res.status(200).json(libraries)
  } catch (e) {
    res.status(500).json({ error: 'Could not fetch libraries' })
  }
}
