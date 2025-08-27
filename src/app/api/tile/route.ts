import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const z = searchParams.get('z')
  const x = searchParams.get('x')
  const y = searchParams.get('y')

  if (!z || !x || !y) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  const url = `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}.png?lang=ru`

  try {
    const res = await fetch(url)
    const arrayBuffer = await res.arrayBuffer()

    return new Response(Buffer.from(arrayBuffer), {
      headers: {
        'Content-Type': 'image/png',
        'Access-Control-Allow-Origin': '*', // CORS для браузера
      },
    })
  } catch (err) {
    console.error('Tile proxy error:', err)
    return NextResponse.json({ error: 'Failed to fetch tile' }, { status: 500 })
  }
}
