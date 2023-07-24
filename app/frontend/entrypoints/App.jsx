import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CultureMatcher from "../pages/CultureMatcher";

/**
 * App is the entry point and router of the application
 */
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
