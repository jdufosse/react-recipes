import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./shared/Layout";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes/:id" element={<RecipePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}