import { Suspense } from "react";
import Home from "./pages/Home.jsx";
import Loader from "./components/common/Loader.jsx";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  );
}

export default App;