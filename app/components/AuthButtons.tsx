import { useUser } from "@/helpers/hooks";
import { Link } from "react-router";

export default function AuthButtons() {
  const [user] = useUser();
  if (!user)
    return (
      <>
        <Link to={"/auth/login"} className="btn btn-primary">
          Login
        </Link>
      </>
    );
  return (
    <span className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-primary ring btn-soft btn-circle "
      >
        {user.username[0]}
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content ring ring-current/20  menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg"
      >
        <li>
          <a>Profile</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </span>
  );
}
