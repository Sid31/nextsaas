import Link from "next/link";
import { useUser } from "../context/user";

const Nav = () => {
  const { user } = useUser();

  return (
    <nav className="flex py-4 px-6 border-b border-gray-200">
      <Link href="/">Home</Link>
      {!!user && (
        <Link href="/dashboard">
          <div className="ml-2">Dashboard</div>
        </Link>
      )}
      <Link href="/pricing">
        <div className="ml-2">Pricing</div>
      </Link>
      <div className="ml-auto">
        <Link href={user ? "/logout" : "/login"}>
          <div>{user ? "Logout" : "Login"}</div>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
