import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import WorkspaceChanger from './workspace-changer'

export default function Header() {
  return (
    <header className='py-4 flex'>
      <WorkspaceChanger />
      <nav className='container flex items-center justify-between'>
        <ul className='flex gap-6'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/blog'>Posts</Link>
          </li>
        </ul>

        <ThemeToggle />
      </nav>
    </header>
  )
}