import { Link } from "react-router";

const footer_links = [
  {
    name: "terms",
    path: "/",
  },
  {
    name: "DMCA",
    path: "/",
  },
  {
    name: "contact",
    path: "/",
  },
  {
    name: "App",
    path: "/",
  },
];

export default function Footer() {
  return (
    <div className="bg-base-200  py-12 z-10">
      <div className="container my-auto mx-auto space-y-4">
        <div className="flex items-center">
          <span className="text-3xl font-bold">Anira</span>
          <div className="divider divider-horizontal"></div>
        </div>
        <div className="divider"></div>
        <div className="space-x-4 ">
          {footer_links.map((item) => (
            <>
              <Link
                className=" link text-sm label capitalize btn-ghost"
                to={item.path}
              >
                {item.name}
              </Link>
            </>
          ))}
        </div>
        <div className="divider my-2" />
        <div className=" space-y-2">
          <div className=" text-sm wrap-anywhere">
            Anira does not store any files on our server, we only linked to the
            media which is hosted on 3rd party services.
          </div>
          <div className=" block text-sm">
            © Anira.to. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
