import Image from 'next/image';
import Link from 'next/link';
import madlogo from '../public/madlogo.png';

// export interface madlogo {
//   src: string
//   alt: string
// }

function Header() {
  return (
    <header className="flex bg-gradient-to-r from-black via-violet-600 to-black ... text-white justify-between p-2 max-w-4xl mx-auto">
      <div className="flex items-center space-x-5 ml-8">
        <Link href="/">
          <Image
            className="flex object-contain cursor-pointer"
            src={madlogo}
            width="50%"
            height="50%"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-5 mr-8">
        <h3>About</h3>
        <h3>Contact</h3>
        <h3 className="bg-violet-600 px-4 py-1 rounded-full">Follow</h3>
      </div>
    </header>
  )
}
export default Header
