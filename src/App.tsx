import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { About } from "./pages/About.tsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
