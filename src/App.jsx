import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toast } from "@radix-ui/react-toast";
import { Toaster } from "./components/ui/toaster";
import { StarBackground } from "./components/StarBackground";

function App() {
  return (
    <>
      <Toaster />
      <StarBackground />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
