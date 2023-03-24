import { useContext } from 'react';
import { Footer, Navbar } from '../components';
import { About, Explore, Feedback, GetStarted, Hero, Insights, WhatsNew, World } from '../sections';
import { AppConfig } from './context/AppConfig';


function Home() {
  const { ERC20Check } = useContext(AppConfig);
  console.log(ERC20Check("0x07865c6e87b9f70255377e024ace6630c1eaa37f"))
  return (
    <div className="bg-primary-black overflow-hidden">
      <Navbar />
      <Hero />
      <div className="relative">
        <About />
        <div className="gradient-03 z-0" />
        <Explore />
      </div>
      <div className="relative">
        <GetStarted />
        <div className="gradient-04 z-0" />
        <WhatsNew />
      </div>
      <World />
      <div className="relative">
        {/* //<Insights /> */}
        <div className="gradient-04 z-0" />
        <Feedback />
      </div>
      <Footer />
    </div>
  )
}

export default Home;