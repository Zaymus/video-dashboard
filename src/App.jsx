import { Suspense } from "react";
import Home from "./pages/Home.jsx";
import Loader from "./components/common/Loader.jsx";
import Header from "./components/Header/Header.jsx";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Home />
    </Suspense>
  );
}

export default App;