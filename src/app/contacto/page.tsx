import type { Metadata } from 'next'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import {
  PHONE_DISPLAY_NUMBER,
  PHONE_NUMBER,
  WHATSAPP_DISPLAY_NUMBER,
  WHATSAPP_NUMBER,
} from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Contacto | Dima',
  description: 'Contacta a Dima por teléfono, WhatsApp o redes sociales.',
}

function SocialIcon({ network }: { network: 'instagram' | 'facebook' | 'whatsapp' }) {
  if (network === 'instagram') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    )
  }

  if (network === 'facebook') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M12 2.5A9.4 9.4 0 0 0 4 17l-1.2 4.4L7.3 20A9.5 9.5 0 1 0 12 2.5Zm0 17.1c-1.4 0-2.8-.4-4-1.1l-.3-.2-2.6.7.7-2.5-.2-.3A7.6 7.6 0 1 1 12 19.6Zm4.2-5.7c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.3.1-.5l.4-.4c.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4-.1-.1-.5-1.3-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.6 2.5 3.9 3.4.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1 0-.1-.2-.2-.4-.3Z" />
    </svg>
  )
}

const contactLinks = [
  {
    name: 'Teléfono',
    subtitle: PHONE_DISPLAY_NUMBER,
    href: `tel:${PHONE_NUMBER}`,
    icon: <Phone aria-hidden="true" className="h-7 w-7" />,
    color: 'text-red-400',
  },
  {
    name: 'WhatsApp',
    subtitle: WHATSAPP_DISPLAY_NUMBER,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: <SocialIcon network="whatsapp" />,
    color: 'text-emerald-400',
    external: true,
  },
  {
    name: 'Correo electrónico',
    subtitle: 'info@dima.cr',
    href: 'mailto:info@dima.cr',
    icon: <Mail aria-hidden="true" className="h-7 w-7" />,
    color: 'text-gray-300',
  },
  {
    name: 'Instagram',
    subtitle: '@dimacrc',
    href: 'https://www.instagram.com/dimacrc/',
    icon: <SocialIcon network="instagram" />,
    color: 'text-pink-400',
    external: true,
  },
  {
    name: 'Facebook',
    subtitle: 'Dimacr',
    href: 'https://www.facebook.com/Dimacr',
    icon: <SocialIcon network="facebook" />,
    color: 'text-blue-400',
    external: true,
  },
]

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-6xl py-6 sm:py-10">
      <section
        aria-labelledby="contact-title"
        className="overflow-hidden rounded-3xl bg-[#171717] px-6 py-10 text-white shadow-xl sm:px-12 sm:py-14"
      >
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
            Estamos para ayudarte
          </p>
          <h1 id="contact-title" className="text-3xl font-semibold sm:text-5xl">
            Conectemos
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Escríbenos o síguenos para conocer más sobre fotografía, nuestros productos y novedades.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {contactLinks.map((contact) => (
            <a
              key={contact.name}
              href={contact.href}
              target={contact.external ? '_blank' : undefined}
              rel={contact.external ? 'noopener noreferrer' : undefined}
              className="group flex min-h-24 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
            >
              <span className={contact.color}>{contact.icon}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{contact.name}</span>
                <span className="mt-1 block truncate text-sm text-white/60">{contact.subtitle}</span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-white/40 transition group-hover:text-white"
              />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
