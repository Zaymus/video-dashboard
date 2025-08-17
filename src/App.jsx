import { Suspense } from "react";
import Home from "./pages/Home";
import { Loader, Fullscreen } from "./components/common";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route} from 'react-router';
import Video from './pages/Video';
import SearchResults from './pages/SearchResults';
import styled from "styled-components";

const AppContainer = styled.div`
  margin-top: var(--header-height);
  padding-top: 10px;
`;

const App = () => {
  return (
    <>
      <Suspense fallback={<Fullscreen><Loader /></Fullscreen>}>
        <Header />
        <AppContainer>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/Video/:videoId" element={<Video />}/>
                <Route path="/Search" element={<SearchResults />}/>
              </Routes>
            </BrowserRouter>
        </AppContainer>
      </Suspense>
    </>
  );
}

export default App;