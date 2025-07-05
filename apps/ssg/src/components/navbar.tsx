export function Navbar() {
  return (
    <nav className="flex justify-center items-center p-2 z-10 relative text-lg font-bold op-95">
      <a className="flex text-black items-center" href="/">
        <div className="i-mdi:calendar w-5 h-5 relative top-0.1"></div>
        <div className="ml-1">日程</div>
      </a>
    </nav>
  )
}
