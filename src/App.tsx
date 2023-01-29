import Home from "pages/Home";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "styles/global";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
