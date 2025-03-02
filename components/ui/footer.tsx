import { Link } from '@heroui/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center py-3">
    <Link
      isExternal
      className="flex items-center gap-1 text-current"
      href="https://profile-six-ochre.vercel.app"
      title="heroui.com homepage"
    >
      <span className="text-default-600">Powered by</span>
      <p className="text-primary">Rishabh Ranjan</p>
    </Link>
  </footer>
  )
}

export default Footer
