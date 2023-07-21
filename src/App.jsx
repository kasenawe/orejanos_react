import NavbarSite from "./components/NavbarSite";
import Router from "./components/Router";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <NavbarSite />
      <Router />

      <Footer />
    </div>
  );
}

export default App;
