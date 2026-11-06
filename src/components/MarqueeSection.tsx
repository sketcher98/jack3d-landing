import { useEffect, useRef, useState } from 'react'

// 21 gif list; celestia is dead (404) so we substitute a verified duplicate
const GIFS = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif', // substitute for dead celestia
]

const ROW1 = GIFS.slice(0, 11)
const ROW2 = GIFS.slice(11)

function Tile({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0"
    />
  )
}

export default function MarqueeSection() {
  const secRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(200)

  useEffect(() => {
    let raf = 0
    function onScroll() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = secRef.current
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY
        setOffset((window.scrollY - top + window.innerHeight) * 0.3)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={secRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10">
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3 will-change-transform"
          style={{ transform: `translateX(${offset - 200}px)` }}
        >
          {[...ROW1, ...ROW1, ...ROW1].map((g, i) => (
            <Tile key={`r1-${i}`} src={g} />
          ))}
        </div>
        <div
          className="flex gap-3 will-change-transform"
          style={{ transform: `translateX(${-(offset - 200)}px)` }}
        >
          {[...ROW2, ...ROW2, ...ROW2].map((g, i) => (
            <Tile key={`r2-${i}`} src={g} />
          ))}
        </div>
      </div>
    </section>
  )
}
