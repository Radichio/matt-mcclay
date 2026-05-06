export default async (req) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('', { status: 200, headers })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers })
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return new Response(JSON.stringify({ error: 'GITHUB_TOKEN not configured' }), { status: 500, headers })
  }

  try {
    const body = await req.json()
    const { availability } = body

    if (!availability) {
      return new Response(JSON.stringify({ error: 'No availability data provided' }), { status: 400, headers })
    }

    const owner    = 'Radichio'
    const repo     = 'matt-mcclay'
    const filePath = 'public/availability.json'
    const apiBase  = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`

    const ghHeaders = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'MattMcClayDrone/1.0',
    }

    // Get current file SHA (required for update)
    let sha = null
    const getRes = await fetch(apiBase, { headers: ghHeaders })
    if (getRes.ok) {
      const current = await getRes.json()
      sha = current.sha
    }

    // Encode new content
    const content = btoa(JSON.stringify(availability, null, 2))

    // Commit to GitHub
    const putBody = {
      message: `Update availability — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
      content,
      ...(sha ? { sha } : {}),
    }

    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers: ghHeaders,
      body: JSON.stringify(putBody),
    })

    if (!putRes.ok) {
      const err = await putRes.json()
      return new Response(JSON.stringify({ error: `GitHub error: ${err.message}` }), { status: 500, headers })
    }

    return new Response(JSON.stringify({ success: true, message: 'Availability published. Live in ~60 seconds.' }), { status: 200, headers })

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers })
  }
}

export const config = { path: '/api/publish-availability' }
