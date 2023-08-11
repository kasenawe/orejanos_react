import Header from "../components/Header";
import HomeArticles from "../components/HomeArticles";
import HomeIntro from "../components/HomeIntro";

import "./Home.css";

function Home() {
  return (
    <>
      <Header />
      <div className="home-container">
        <HomeIntro />
        <div className="home-separator" />
        <HomeArticles />
      </div>
    </>
  );
}

export default Home;
