
import "./App.css";

import Header from "../components/Header/Header";
import Timer from "../features/timer/components/Timer";

export default function App() {
  return (
    <div className="app">
      <Header />

      <main className="main">
        <Timer />
      </main>
    </div>
  );
}
