import { useContext, useEffect } from 'react';
import { Footer, Navbar } from '../components';
import { About, Explore, Feedback, GetStarted, Hero, bar, WhatsNew, World } from '../sections';
import { AppConfig } from './context/AppConfig';


function Home() {
  const { ERC20Check, isERC20, totalSupply, returnOwner, contractDeployer, returnBalanceOfTokens, getTotalNumberOfHolders, computeCirculation, getTokenSymbol, verifiedOrNot } = useContext(AppConfig);

  useEffect(() => {
    // console.log(ERC20Check("0x07865c6e87b9f70255377e024ace6630c1eaa37f"))
    // console.log(returnOwner("0x07865c6e87b9f70255377e024ace6630c1eaa37f"))
    // returnBalanceOfTokens(contractDeployer, "0x07865c6e87b9f70255377e024ace6630c1eaa37f")
    // getTotalNumberOfHolders("0x4Fabb145d64652a948d72533023f6E7A623C7C53")
    // computeCirculation("0x820784E198D75847142f32F875C2d01e45925a84")
    // getTokenSymbol("0x820784E198D75847142f32F875C2d01e45925a84")
    verifiedOrNot("0x69E7294e94d33aA6109486BA10Bfaf25F823D05d")

  }, [computeCirculation])
  return (
    <div className="bg-primary-black overflow-hidden">
      <Navbar />
      <Hero />
      <bar/>
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