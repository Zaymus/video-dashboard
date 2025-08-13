import { Suspense } from "react";
import Home from "./pages/Home";
import Loader from "./components/common/Loader.jsx";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route} from 'react-router';
import Video from './pages/Video';
import SearchResults from './pages/SearchResults';
import styled from "styled-components";

const AppContainer = styled.div`
  margin-top: 75px;
  padding: 10px 20px;
`;

const FullScreen = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <>
      <Suspense fallback={<FullScreen><Loader /></FullScreen>}>
        <Header />
      </Suspense>
      <AppContainer>
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/Video/:videoID" element={<Video />}/>
              <Route path="/Search" element={<SearchResults />}/>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </AppContainer>
    </>
  );
}

export default App;