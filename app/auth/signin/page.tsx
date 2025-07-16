import SignInForm from "./component/signinForm";

export const metadata = {
  title: "EduCart | Sign In",
};

export default function SignIn() {
  return (
    <div className="h-screen flex justify-center items-center">
      <SignInForm />
    </div>
  );
}
