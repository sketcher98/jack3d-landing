import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'

export default function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  return (
    <p ref={ref} className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)]">
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          style={{ opacity: scrollYProgress }}
          transition={{ delay: 0 }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </p>
  )
}
