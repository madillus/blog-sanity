import Image from 'next/image';
import swirltrans from '../public/swirltrans.png';

function Hero() {
  return (
    <div className="flex flex-row justify-between items-center  border-black px-12 space-y-5 py-10">
      <div className="flex mt-8 flex-col  space-y-5">
        <h1 className="text-6xl max-w-xl font-serif">
          <span className="underline decoration-violet-600 text-violet-600">
            Madillus
          </span>{' '}
          is my name and blogging is my game!
        </h1>
        <h2 className="flex text-2xl font-serif">
          The coding journey of a lifetime!
        </h2>
      </div>
      <div className="hidden md:inline-flex">
        <Image
          className="hidden md:inline-flex object-contain "
          src={swirltrans}
          width="200%"
          height="200%"
        />
      </div>
    </div>
  )
}
export default Hero
