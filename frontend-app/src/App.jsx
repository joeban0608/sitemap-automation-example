import "./App.css";

function App() {
  return (
    <main>
      <h1>SEO example: {DOMAIN}</h1>
      <a href="https://masaya365casino.win" style={{ display: "none" }}>
        masaya365casino.win
      </a>
      <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {links.map((link) => {
          return (
            <a href={link} key={link} style={{ textAlign: "start" }}>
              <li>{link}</li>
            </a>
          );
        })}
      </ul>
    </main>
  );
}

export default App;

const DOMAIN = "masaya365casino.win";
const links = [
  `https://masaya365casino.win/masaya365-new-2024/`,
  `https://masaya365casino.win/2024/09/02/masaya365-100bonus-firstdeposit/`,
  `https://masaya365casino.win/2024/08/23/masaya365-win1000k-cockfighting-prize/`,
  `https://masaya365casino.win/2024/08/19/bccomebonus365member/`,
  `https://masaya365casino.win/2024/08/12/articlesharing-13/`,
  `https://masaya365casino.win/2024/08/12/articlesharing-12/`,
  `https://masaya365casino.win/2024/08/12/articlesharing-11/`,
];
