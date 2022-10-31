import Image from 'next/image';
import Link from 'next/link';
import madlogo from '../public/madlogo.png';

// export interface madlogo {
//   src: string
//   alt: string
// }

function Footer() {
  return (
    <footer className="flex items-center justify-center relative flex-col bg-gradient-to-r from-black via-violet-600 to-black ... text-white p-4 max-w-4xl bottom-0">
      <a href="https://www.aidangilmore.eu/"> Aidan Gilmore © 2022 </a>
    </footer>
  )
}
export default Footer
{
  /* <div className="flex items-center space-x-5 ml-8">
        <Link href="/">
          <a>
            <Image
              className="flex object-contain cursor-pointer"
              src={madlogo}
              width="50%"
              height="50%"
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
</div>*/
}
