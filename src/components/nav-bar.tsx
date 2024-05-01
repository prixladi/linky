import Link from 'next/link';

export const NavBar = () => (
  <div className="navbar backdrop-blur-sm	fixed z-50">
    <div className="flex-1 navbar-start">
      <Link href="/" className="btn btn-ghost text-2xl">
        Linky
      </Link>
    </div>

    <div className="navbar-end">
      <Link href="/dashboard" className="btn btn-neutral">
        Dashboard
      </Link>

      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            Theme
            <svg
              width="12px"
              height="12px"
              className="h-2 w-2 fill-current opacity-60 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
            </svg>
          </div>
          <ul className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Valentine"
                value="valentine"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Retro"
                value="retro"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Aqua"
                value="aqua"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);
