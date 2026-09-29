import LogoutButton from "./LogoutButton";

export default function ProfileCard({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <div className="w-full shrink-0 rounded-md border border-gray-800 bg-neutral-900 p-6 lg:max-w-80">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-500 text-heading-6 font-semibold text-neutral-900">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate text-paragraph-l font-medium text-[#FCFCFC]">
            {name}
          </p>
          <p className="truncate text-paragraph-s text-neutral-300">{email}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-800 pt-6">
        <LogoutButton />
      </div>
    </div>
  );
}
