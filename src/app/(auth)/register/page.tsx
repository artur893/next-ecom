import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-primary-500 text-heading-2 font-semibold mb-10">
        Devstock<span className="text-neutral-100">Hub</span>
      </h1>
      <RegisterForm />
    </div>
  );
}
