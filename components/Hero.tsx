import Image from 'next/image'
import swirltrans from '../public/swirltrans.png'

function Hero() {
  return (
    <div className="flex flex-row justify-between items-center border-black px-4 space-y-5 py-10">
      <div className="flex mt-8 flex-col space-y-5">
        <h1 className="text-6xl max-w-xl font-serif">
          <span className="underline decoration-violet-600 text-violet-600">
            Madillus
          </span>{' '}
          Unplugged: Untangling the Web of Development and UX
        </h1>
        <h2 className="flex text-2xl font-serif">The journey of a lifetime!</h2>
      </div>
      <div className="hidden md:inline-flex">
        <Image
          className="hidden md:inline-flex object-contain "
          src={swirltrans}
          width="200%"
          height="200%"
          alt="Logo"
        />
      </div>
    </div>
  )
}
export default Hero
