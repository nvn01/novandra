import { memo } from 'react'
import Link from 'next/link'

import styles from './header.module.css'
import { Logo as LogoIcon } from '@components/icons'
import Command from '@components/command'

const Header = ({ title, content, home = false }) => {
  return (
    <nav className={`${styles.nav} ${home ? styles.homeNav : ''}`}>
      <div className={`${styles.header} ${home ? styles.homeHeader : ''}`}>
        <Link href="/">
          <a aria-label="Navigate Home" className={styles.logo}>
            <LogoIcon />
          </a>
        </Link>

        <Command />

        {title && <div className={styles.content}>{title}</div>}
      </div>
    </nav>
  )
}

Header.displayName = 'Header'
export default memo(Header)
