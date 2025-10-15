import { Link } from "react-router";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <div className="h-16 grid place-items-center sticky top-0 bg-base-100 z-20 bg-">
      <nav className="mx-auto container flex items-center gap-2">
        <Link to={"/"} className="text-xl font-bold">
          AniRaa
        </Link>
        <div className="">
          <SearchBar />
        </div>
        <div className="ml-auto">
          <Link to={"/auth/login"} className="btn btn-primary">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
}
