import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./routes/Home";
import Intro from "./routes/Intro";
import Search from "./routes/Search";
import Tv from "./routes/Tv";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/tv*" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies*" element={<Home />} />
        <Route path="/" element={<Intro />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
