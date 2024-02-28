import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          socialButtonsIconButton: "rounded-full",
          formFieldInput: "rounded-full",
          formButtonPrimary: "rounded-full",
          internal: "bg-slate-500",
        },
      }}
    />
  );
}
