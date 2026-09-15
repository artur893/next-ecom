import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center pt-10 pb-20">
      <h1 className="text-primary-500 text-heading-2 font-semibold mb-10">
        Devstock<span className="text-neutral-100">Hub</span>
      </h1>
      <LoginForm />
    </div>
  );
}
