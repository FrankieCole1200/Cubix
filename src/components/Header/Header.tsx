
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Cubix</h1>

      <nav className={styles.nav}>
        <a href="/">Timer</a>
        <a href="/statistics">Statistics</a>
        <a href="/settings">Settings</a>
      </nav>
    </header>
  );
}
