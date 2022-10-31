import Image from 'next/image';
import Link from 'next/link';
import madlogo from '../public/madlogo.png';

function Header() {
  return (
    <header className="flex bg-gradient-to-r from-black via-violet-600 to-black ... text-white justify-between p-2 max-w-4xl">
      <div className="flex items-center space-x-5 ml-8">
        <Link href="/">
          <a>
            <Image
              className="flex object-contain cursor-pointer"
              src={madlogo}
              width="50%"
              height="50%"
              alt="Madillus Logo"
            />
          </a>
        </Link>
      </div>
      <div className="flex items-center space-x-5 mr-8">
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/follow" className="bg-violet-600 px-4 py-1 rounded-full">
          <a>
            <h3 className="bg-violet-600 px-4 py-1 rounded-full">Follow</h3>
          </a>
        </Link>
      </div>
    </header>
  )
}
export default Header
