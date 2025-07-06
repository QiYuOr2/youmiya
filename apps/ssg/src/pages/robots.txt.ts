import type { APIRoute } from 'astro'

function getRobotsTxt() {
  return `
User-agent: *
Allow: /
`
}

export const GET: APIRoute = () => {
  return new Response(getRobotsTxt())
}
