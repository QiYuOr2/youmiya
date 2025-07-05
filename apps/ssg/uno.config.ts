import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    { 'fixed-full': 'fixed top-0 bottom-0 left-0 right-0' },
  ],
  rules: [
    [
      /^bg-gradient-mask$/,
      () => ({
        'background-image': `linear-gradient(
          0deg,
          color-mix(
            in oklab,
            color-mix(
              in oklch,
              oklch(65.9% 0.16 226.7) 100%,
              #fff
            ) 40%,
            transparent
          ),
          color-mix(
            in oklch,
            oklch(clamp(0%, calc(100% + 0%), 100%) .01 160) 40%,
            color-mix(
              in oklch,
              oklch(65.9% 0.16 226.7) 100%,
              #fff
            )
          )
        )`,
      }),
    ],
  ],
  presets: [
    presetAttributify(),
    presetWind3(),
    presetIcons(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
