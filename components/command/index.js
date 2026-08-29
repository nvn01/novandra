import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useState,
  memo
} from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import useDelayedRender from 'use-delayed-render'
import { DialogContent, DialogOverlay } from '@reach/dialog'

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  useCommand,
  usePages,
  CommandGroup
} from 'cmdk'

import {
  Command as CommandIcon,
  Sparkles,
  Pencil,
  Search,
  RSS,
  Design,
  Camera,
  Book,
  Music,
  Document,
  Quote,
  Words,
  Lightbulb,
  ArrowRight,
  GitHub,
  Twitter
} from '@components/icons'
import styles from './command.module.css'
import headerStyles from '@components/header/header.module.css'
import { useTheme } from 'next-themes'
import tinykeys from '@lib/tinykeys'
import postMeta from '@data/blog.json'
import profile from '@data/profile.json'

const CommandData = React.createContext({})
const useCommandData = () => React.useContext(CommandData)

const CommandMenu = memo(() => {
  const listRef = useRef()
  const commandRef = useRef()
  const inputRef = useRef()
  const mobileFocusRef = useRef()
  const router = useRouter()
  const commandProps = useCommand({
    label: 'Site Navigation'
  })
  const [pages, setPages] = usePages(commandProps, ThemeItems)
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { search, list } = commandProps

  const isMobileViewport = useCallback(
    () => window.matchMedia('(max-width: 600px)').matches,
    []
  )

  const openCommand = useCallback(() => {
    setMobileOpen(isMobileViewport())
    setOpen(true)
  }, [isMobileViewport])

  const toggleCommand = useCallback(() => {
    setOpen(current => {
      if (!current) setMobileOpen(isMobileViewport())
      return !current
    })
  }, [isMobileViewport])

  const { mounted, rendered } = useDelayedRender(open, {
    enterDelay: -1,
    exitDelay: 200
  })

  // Can't do this inside of useCommand because it relies on useDelayedRender
  useEffect(() => {
    if (!mounted) {
      setPages([DefaultItems])
    }
  }, [mounted, setPages])

  const Items = pages[pages.length - 1]

  const keymap = useMemo(() => {
    return {
      t: () => {
        setPages([ThemeItems])
        openCommand()
      },
      // Blog
      'g b': () => router.push('/blog'),
      'g u': () => router.push('/publications'),
      // Navigation
      'g h': () => router.push('/'),
      'g a': () => router.push('/about'),
      'g c': () => router.push('/contact'),
      // Collections
      'g r': () => router.push('/reading'),
      'g d': () => router.push('/design'),
      'g f': () =>
        window.location.assign('https://analog-film-novandra.vercel.app'),
      'g m': () => router.push('/music'),
      'g p': () => router.push('/projects'),
      'g q': () => router.push('/quotes'),
      'g w': () => router.push('/words'),
      'g i': () => router.push('/ideas'),
      // Social
      'g t': () => window.open('https://x.com/novandraanugrah', '_blank')
    }
  }, [openCommand, router, setPages])

  // Register the keybinds globally
  useEffect(() => {
    const unsubs = [
      tinykeys(window, keymap, { ignoreFocus: true }),
      tinykeys(window, { '$mod+k': toggleCommand })
    ]
    return () => {
      unsubs.forEach(unsub => unsub())
    }
  }, [keymap, toggleCommand])

  useEffect(() => {
    if (!mounted || !mobileOpen) return undefined

    const frame = window.requestAnimationFrame(() => {
      if (document.activeElement === inputRef.current) {
        inputRef.current.blur()
        mobileFocusRef.current?.focus()
      }
    })

    return () => window.cancelAnimationFrame(frame)
  }, [mobileOpen, mounted, pages])

  useEffect(() => {
    // When items change, bounce the UI
    if (commandRef.current) {
      // Bounce the UI slightly
      commandRef.current.style.transform = 'scale(0.99)'
      commandRef.current.style.transition = 'transform 0.1s ease'
      // Not exactly safe, but should be OK
      setTimeout(() => {
        commandRef.current.style.transform = ''
      }, 100)
    }
  }, [pages])

  const heightRef = useRef()

  useEffect(() => {
    if (!listRef.current || !heightRef.current) return

    const height = Math.min(listRef.current.offsetHeight + 1, 300)
    heightRef.current.style.height = height + 'px'
  })

  return (
    <>
      <button
        className={headerStyles.command}
        title="⌘K"
        onClick={openCommand}
      >
        <CommandIcon />
      </button>

      <DialogOverlay
        isOpen={mounted}
        className={cn(styles.screen, {
          [styles.show]: rendered
        })}
        initialFocusRef={mobileOpen ? mobileFocusRef : undefined}
        onDismiss={() => setOpen(false)}
      >
        <DialogContent
          className={styles['dialog-content']}
          aria-label="Site Navigation"
        >
          <Command
            {...commandProps}
            ref={commandRef}
            className={cn(styles.command, {
              [styles.show]: rendered
            })}
          >
            <div
              className={styles.top}
              ref={mobileFocusRef}
              tabIndex={mobileOpen ? -1 : undefined}
            >
              <CommandInput
                ref={inputRef}
                placeholder={
                  Items === ThemeItems
                    ? 'Select a theme...'
                    : Items === BlogItems
                    ? 'Search for posts...'
                    : 'Type a command or search...'
                }
              />
            </div>

            <div
              ref={heightRef}
              className={cn(styles.container, {
                [styles.empty]: list.current.length === 0
              })}
            >
              <CommandList ref={listRef}>
                <CommandData.Provider
                  value={{ pages, search, open, setPages, keymap, setOpen }}
                >
                  <Items />
                </CommandData.Provider>
              </CommandList>
            </div>
          </Command>
        </DialogContent>
      </DialogOverlay>
    </>
  )
})

CommandMenu.displayName = 'CommandMenu'
export default CommandMenu

const ThemeItems = () => {
  const { theme: activeTheme, themes, setTheme } = useTheme()
  const { setOpen } = useCommandData()

  return themes.map(theme => {
    if (theme === activeTheme) return null
    return (
      <Item
        value={theme}
        key={`theme-${theme}`}
        callback={() => {
          setTheme(theme)
          setOpen(false)
        }}
      >
        {theme}
      </Item>
    )
  })
}

const BlogItems = () => {
  const router = useRouter()

  return postMeta.map((post, i) => {
    return (
      <Item
        key={`blog-item-${post.title}-${i}`}
        value={post.title}
        callback={() => router.push('/blog/[slug]', `/blog/${post.slug}`)}
      />
    )
  })
}

const Label = ({ title, values, search }) => {
  return (
    <div className={styles.label} aria-hidden>
      {title}
    </div>
  )
}

const Group = ({ children, title }) => {
  return (
    <CommandGroup heading={<Label title={title} />} className={styles.group}>
      {children}
    </CommandGroup>
  )
}

const DefaultItems = () => {
  const router = useRouter()
  const { setPages, pages } = useCommandData()

  return (
    <>
      <Item
        value="Themes"
        icon={<Sparkles />}
        keybind="t"
        closeOnCallback={false}
      />
      <Group title="Blog">
        <Item value="Blog" icon={<Pencil />} keybind="g b" />
        <Item value="Publications" icon={<Document />} keybind="g u" />
        <Item
          value="Search blog..."
          icon={<Search />}
          closeOnCallback={false}
          callback={() => setPages([...pages, BlogItems])}
        />
        <Item
          value="RSS"
          icon={<RSS />}
          callback={() => router.push('/feed.xml')}
        />
      </Group>

      <Group title="Collection">
        <Item value="Reading" icon={<Book />} keybind="g r" />
        <Item value="Design" icon={<Design />} keybind="g d" />
        <Item value="Analog Film" icon={<Camera />} keybind="g f" />
        <Item value="Music" icon={<Music />} keybind="g m" />
        <Item value="Projects" icon={<Document />} keybind="g p" />
        <Item value="Quotes" icon={<Quote />} keybind="g q" />
        <Item value="Words" icon={<Words />} keybind="g w" />
        <Item value="Ideas" icon={<Lightbulb />} keybind="g i" />
      </Group>

      <Group title="Navigation">
        <Item value="Home" icon={<ArrowRight />} keybind="g h" />
        <Item value="About" icon={<ArrowRight />} keybind="g a" />
        <Item value="Contact" icon={<ArrowRight />} keybind="g c" />
      </Group>

      <Group title="Social">
        <Item
          value="GitHub"
          icon={<GitHub />}
          callback={() => window.open(profile.links.github, '_blank')}
        />
        <Item
          value="Kaggle"
          icon={<Document />}
          callback={() => window.open(profile.links.kaggle, '_blank')}
        />
        <Item
          value="LinkedIn"
          icon={<Document />}
          callback={() => window.open(profile.links.linkedin, '_blank')}
        />
        <Item
          value="Twitter"
          icon={<Twitter />}
          keybind="g t"
          callback={() => window.open(profile.links.twitter, '_blank')}
        />
      </Group>
    </>
  )
}

const Item = ({
  icon,
  children,
  callback,
  closeOnCallback = true,
  keybind,
  ...props
}) => {
  const { keymap, setOpen } = useCommandData()

  const cb = () => {
    if (callback) {
      callback()
    } else {
      keymap[keybind]?.()
    }

    if (closeOnCallback) {
      setOpen(false)
    }
  }

  return (
    <CommandItem {...props} callback={cb}>
      <div>
        <div className={styles.icon}>{icon}</div>
        {children || props.value}
      </div>

      {keybind && (
        <span className={styles.keybind}>
          {keybind.includes(' ') ? (
            keybind.split(' ').map((key, i) => {
              return <kbd key={`keybind-${key}-${i}`}>{key}</kbd>
            })
          ) : (
            <kbd>{keybind}</kbd>
          )}
        </span>
      )}
    </CommandItem>
  )
}
