import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CultureMatcher from "../pages/CultureMatcher";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CultureMatcher />} />
        </Routes>
      </Router>
    </>
  );
}
