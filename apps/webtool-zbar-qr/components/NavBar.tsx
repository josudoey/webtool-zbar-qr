const NavBar: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <nav className='flex items-center bg-gray-900 text-white px-4 py-2'>
      <div className='flex items-center font-bold text-lg'>
        <div>webtool-zbar-qr</div>
        {children}
      </div>
    </nav>
  )
}

export default NavBar
