// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'app',
    pnpm: true,
    typescript: true,
    ignores: ['**/*.{svg,png,jpg,ics,json}', 'apps/ssg/.astro', 'apps/ssg/public'],
  },
)
