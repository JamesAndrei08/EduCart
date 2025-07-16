import SignUpForm from "./component/signupForm";

export const metadata = {
  title: "EduCart | Sign Up",
};

export default function SignUp() {
  return (
    <div className="h-screen flex justify-center items-center">
      <SignUpForm />
    </div>
  );
}
