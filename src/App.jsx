import NavbarSite from "./components/NavbarSite";
import Router from "./components/Router";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <NavbarSite />
      <div className="content-after-nav">
        <Router />
      </div>

      <Footer />
    </div>
  );
}

export default App;
