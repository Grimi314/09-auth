import css from "./Header.module.css";
import Link from "next/link";
import AuthNAvigation from "../AuthNavigation/AuthNavigationt";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
          <AuthNAvigation />
        </ul>
      </nav>
    </header>
  );
}
