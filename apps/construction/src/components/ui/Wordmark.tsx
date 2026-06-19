import styles from "./Wordmark.module.css";

export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`${styles.wordmark} ${className}`}>
      Talmage<i className={styles.amp}>·</i>Construction
    </span>
  );
}
