import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { checkUser } from "../queries/queries";
import { useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { userLoginSchema, userRegisterSchema } from "../schemas/userSchemas";

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
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onChange: userLoginSchema,
    },
  });

  //TODO: make post request to the server and handle the response
  return (
    <form className="flex-col gap-2">
      <h2 className="m-2 underline text-2xl text-bold">Sign In</h2>
      <div className="m-2">
        <form.Field
          name="username"
          children={(field) => (
            <>
              <div className="my-1">
                <label className="label">Username</label>
                {field.state.meta.errors?.[0]?.message ? (
                  <em className="validator-hint m-2 text-xs text-error">
                    {field.state.meta.errors[0].message}
                  </em>
                ) : null}
              </div>
              <input
                required
                value={field.state.value}
                placeholder="Username"
                minLength={4}
                pattern="^[a-zA-Z0-9]+$"
                onChange={(e) => field.handleChange(e.target.value)}
                className="input input-bordered validator input-primary"
              />
            </>
          )}
        />
      </div>
      <div className="m-2">
        <form.Field
          name="password"
          children={(field) => (
            <>
              <div className="my-1">
                <label className="label">Password</label>
                {field.state.meta.errors?.[0]?.message ? (
                  <em className="validator-hint m-2 text-xs text-error">
                    {field.state.meta.errors[0].message}
                  </em>
                ) : null}
              </div>
              <input
                required
                value={field.state.value}
                placeholder="Password"
                onChange={(e) => field.handleChange(e.target.value)}
                minLength={8}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
                className={`input input-bordered validator ${field.state.meta.errors[0] ? "input-error" : "input-primary"}`}
              />
            </>
          )}
        />
      </div>
      <form.Subscribe
        //TODO: login post request, handle passing the token somewhere safe (do research)
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button
            className="btn btn-primary m-2"
            type="submit"
            disabled={!canSubmit}
          >
            {isSubmitting ? "..." : "Submit"}
          </button>
        )}
      />
    </form>
  );
}

function Register() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      verifyPassword: "",
    },
    validators: {
      onChange: userRegisterSchema,
    },
  });
  return (
    <div className="flex-col gap-2">
      <h2 className="m-2 underline text-2xl text-bold">Register</h2>
      <div className="m-2">
        <form.Field
          name="username"
          children={(field) => (
            <>
              <div className="my-1">
                <label className="label">Username</label>
                {field.state.meta.errors?.[0]?.message ? (
                  <em className="validator-hint m-2 text-xs text-error">
                    {field.state.meta.errors[0].message}
                  </em>
                ) : null}
              </div>
              <input
                required
                value={field.state.value}
                placeholder="Username"
                minLength={4}
                pattern="^[a-zA-Z0-9]+$"
                onChange={(e) => field.handleChange(e.target.value)}
                className="input input-bordered validator input-primary"
              />
            </>
          )}
        />
      </div>
      <div className="m-2">
        <form.Field
          name="email"
          children={(field) => (
            <>
              <div className="my-1">
                <label className="label">Email</label>
                {field.state.meta.errors?.[0]?.message ? (
                  <em className="validator-hint m-2 text-xs text-error">
                    {field.state.meta.errors[0].message}
                  </em>
                ) : null}
              </div>
              <input
                required
                value={field.state.value}
                placeholder="email"
                type="email"
                onChange={(e) => field.handleChange(e.target.value)}
                className="input input-bordered validator input-primary"
              />
            </>
          )}
        />
      </div>
      <div className="m-2">
        <form.Field
          name="password"
          children={(field) => (
            <>
              <div className="my-1">
                <label className="label">Password</label>
                {field.state.meta.errors?.[0]?.message ? (
                  <em className="validator-hint m-2 text-xs text-error">
                    {field.state.meta.errors[0].message}
                  </em>
                ) : null}
              </div>
              <input
                required
                value={field.state.value}
                placeholder="Password"
                onChange={(e) => field.handleChange(e.target.value)}
                minLength={8}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
                className={`input input-bordered validator ${field.state.meta.errors[0] ? "input-error" : "input-primary"}`}
              />
            </>
          )}
        />
      </div>
      <div className="m-2">
        <form.Field
          name="verifyPassword"
          children={(field) => (
            <>
              <div className="my-1">
                <label className="label">Verify Password</label>
                {field.state.meta.errors?.[0]?.message ? (
                  <em className="validator-hint m-2 text-xs text-error">
                    {field.state.meta.errors[0].message}
                  </em>
                ) : null}
              </div>
              <input
                required
                value={field.state.value}
                placeholder="Verify Password"
                onChange={(e) => field.handleChange(e.target.value)}
                minLength={8}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
                className={`input input-bordered validator ${
                  field.state.meta.errors[0] ? "input-error" : "input-primary"
                }`}
              />
            </>
          )}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button
            className="btn btn-primary m-2"
            type="submit"
            disabled={!canSubmit}
          >
            {isSubmitting ? "..." : "Submit"}
          </button>
        )}
      />
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 absolute top-2 right-2 hover:cursor-pointer"
            onClick={() => modalRef.current?.close()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
          {loginOrRegister ? <Login /> : <Register />}
          <div className="flex pt-16 justify-center">
            <button
              className=" bg-secondary/30 border rounded px-2 m-2 hover:cursor-pointer hover:bg-secondary/50"
              onClick={() => setLoginOrRegister(!loginOrRegister)}
            >
              {loginOrRegister
                ? "Need an account?"
                : "Already have an account?"}
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
    const { isPending, data } = useQuery({
      queryKey: ["user"],
      queryFn: checkUser,
    });
    // TODO: refactor the checkUser function to not return null when returning the expected unauthorized response
    // look up the react-query docs for best practices
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
          {isPending ? <></> : data == null ? <SignInModal /> : null}
          <StyleSelector />
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    );
  },
});
