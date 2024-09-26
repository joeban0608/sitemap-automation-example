import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom";
import { DOMAIN, SUB_DOMAINS } from "./constant/subDomains";

function App() {
  return (
    <Router>
      <main>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route index element={<Home />} />
              <Route path="news" element={<News />} />
              <Route path="games" element={<Games />} />
              <Route path="sports" element={<Sports />} />
            </Route>
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;

const Home = () => {
  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {SUB_DOMAINS.map((link) => {
        return (
          <li
            key={link}
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "left",
            }}
          >
            <Link to={link}>{`https://${DOMAIN}${link}`}</Link>
          </li>
        );
      })}
    </ul>
  );
};

const News = () => {
  return (
    <div>
      <h2>News Page</h2>
    </div>
  );
};

const Games = () => {
  return (
    <div>
      <h2>Games Page</h2>
    </div>
  );
};

const Sports = () => {
  return (
    <div>
      <h2>sports Page</h2>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <nav
        style={{
          display: "flex",
          gap: "12px",
          background: "white",
          padding: "12px",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/news">News</Link>
        <Link to="/games">Games</Link>
        <Link to="/sports">Sports</Link>
      </nav>
      <main
        style={{
          width: "100%",
          height: "calc(100dvh - 48px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>SEO example site: {DOMAIN}</h1>
        {children}
      </main>
    </div>
  );
};
