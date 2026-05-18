import styles from './AppShell.module.css';

export function AppShell({ header, children, footer }) {
  return (
    <main className={styles.shell}>
      <header className={styles.header}>{header}</header>
      <section className={styles.content}>{children}</section>
      <footer className={styles.footer}>{footer}</footer>
    </main>
  );
}
