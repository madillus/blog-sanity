import Footer from '../components/Footer';
import Header from '../components/Header';

function follow() {
  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
      <Header />

      <div className="flex align-middle justify-center pt-10">
        <p className="text-xl">Coming Soon!</p>
      </div>
      <div className="flex grow"></div>

      <Footer />
    </div>
  )
}
export default follow
