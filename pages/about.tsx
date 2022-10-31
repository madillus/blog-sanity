import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';

function about() {
  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
      <Header />
      <Hero />
      <div className="flex">
        <p>Hi I'm Aidan</p>
      </div>
      <div className="flex grow"></div>

      <Footer />
    </div>
  )
}
export default about
