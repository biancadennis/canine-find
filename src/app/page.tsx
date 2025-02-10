import LoginForm from '@/app/_components/LoginForm'

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <LoginForm />
    </div>
  );
}
