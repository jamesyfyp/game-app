import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { checkUser } from "../queries/queries";
import { useRef, useState } from "react";

function StyleSelector() {
  return (
    <div className="dropdown flex-none">
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-1 w-24 p-2 shadow-2xl"
      >
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Default"
            value="default"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Retro"
            value="retro"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Cyberpunk"
            value="cyberpunk"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Valentine"
            value="valentine"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Aqua"
            value="aqua"
          />
        </li>
      </ul>
    </div>
  );
}

function Login() {
  return (
    <div className="flex-col gap-2">
      <h2 className="m-2 text-2xl text-bold">Sign In</h2>
      <div className="m-2">
        <input
          type="text"
          className="input input-primary input-bordered"
          placeholder="Username"
        />
      </div>
      <div className="m-2">
        <input
          type="password"
          className="input input-primary input-bordered"
          placeholder="Password"
        />
      </div>
      <div className="m-2">
        <button className="btn btn-primary">Login</button>
      </div>
    </div>
  );
}

function Register() {
  return (
    <div className="flex-col gap-2">
      <h2 className="m-2 text-2xl text-bold">Register</h2>
      <div className="m-2">
        <input
          type="text"
          className="input input-primary input-bordered"
          placeholder="Username"
        />
      </div>
      <div className="m-2">
        <input
          type="email"
          className="input input-primary input-bordered"
          placeholder="email"
        />
      </div>
      <div className="m-2">
        <input
          type="password"
          className="input input-primary input-bordered"
          placeholder="Password"
        />
      </div>
      <div className="m-2">
        <input
          type="verifyPassword"
          className="input input-primary input-bordered"
          placeholder="Verify Password"
        />
      </div>
      <div className="m-2">
        <button className="btn btn-primary">Register</button>
      </div>
    </div>
  );
}

function SignInModal() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [loginOrRegister, setLoginOrRegister] = useState(true);
  return (
    <>
      <button
        className="btn p-2 m-1"
        onClick={() => modalRef.current?.showModal()}
      >
        Sign In
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-96">
          {loginOrRegister ? <Login /> : <Register />}
          <div className="flex justify-center">
            <button
              className=" bg-secondary/30 border rounded px-2 m-2 hover:cursor-pointer hover:bg-secondary/50"
              onClick={() => setLoginOrRegister(!loginOrRegister)}
            >
              {loginOrRegister ? "Need an account?" : "already have an account?"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export const Route = createRootRoute({
  component: () => {
    const queryClient = useQueryClient();
    const { isPending, isError, data, error } = useQuery({
      queryKey: ["user"],
      queryFn: checkUser,
    });
    return (
      <div className="min-h-screen">
        <div className="p-2 flex">
          <div className="btn m-1 flex-none">
            <Link to="/" className="[&.active]:underline">
              Home
            </Link>
          </div>
          <div className="btn m-1 flex-none">
            <Link to="/about" className="[&.active]:underline">
              About
            </Link>
          </div>
          <div className="flex-grow" />
          {isPending ? <></> : data == null ? <SignInModal /> : "hit"}
          <StyleSelector />
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    );
  },
});
