interface NavbarProps {
  currentPath: string
}

function isEqPath(path1: string, path2: string) {
  if (path1 === path2) {
    return true
  }
  if (path1.at(-1) === '/') {
    return path1.slice(0, path1.length - 1) === path2
  }
  if (path2.at(-1) === '/') {
    return path2.slice(0, path1.length - 1) === path1
  }
}

export function Navbar({ currentPath }: NavbarProps) {
  const itemClassName = (path: string) => `flex text-black items-center ${isEqPath(currentPath, path) ? '' : 'op-60'}`

  return (
    <nav className="flex justify-center items-center gap-6 p-2 z-10 relative font-bold op-95">
      <a className={itemClassName('/')} href="/">
        <div className="i-mdi:calendar-text w-5 h-5 relative top-0.1"></div>
        <div className="ml-1">日历</div>
      </a>
      <a className={itemClassName('/list')} href="/list">
        <div className="i-mdi:list-box w-5 h-5 relative"></div>
        <div className="ml-1">总览</div>
      </a>
    </nav>
  )
}
