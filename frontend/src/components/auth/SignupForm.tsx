"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, CheckCircle2, Loader2, Eye, EyeOff} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FadeUp from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/button";
import { error } from "console";
import SuccessDialog from "../common/SuccessDialog";

export default function SignupForm() {
const router = useRouter();

interface FormData {
  fullName: string;
  email: string;
  password: string;
  cpassword: string;
}
interface FormErrors {
  fullName: string;
  email: string;
  password: string;
  cpassword: string;
}

const [formData,setFormData] = useState<FormData>({
fullName: "",
email: "",
password: "",
cpassword: ""
})

const [errors,setErrors] = useState<FormErrors>({
fullName: "",
email: "",
password: "",
cpassword: ""
})

const [buttonLoading,SetButtonLoading] = useState(false)
const [showSuccessDialog, setShowSuccessDialog] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);


const handleInputChange = (elementName: keyof FormData, value: string): void => {
setFormData(prev => ({
	...prev,
	[elementName] : value
}));

 setErrors(prev => ({
    ...prev,
    [elementName]: "",
  }));


}

const validateForm = (): boolean => {
const newErrors: FormErrors = {
fullName: "",
email: "",
password: "",
cpassword: ""
}

Object.entries(formData).forEach(([field,value]) => {
if(value.trim() === ""){
newErrors[field as keyof FormErrors] = "This field is required"
}
})

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 if (
    formData.email.trim() !== "" &&
    !emailRegex.test(formData.email.trim())
  ) {

    newErrors.email = "Please enter a valid email address.";

  }

	const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  if (
    formData.password !== "" &&
    !passwordRegex.test(formData.password)
  ) {

    newErrors.password =
      "Password must be at least 8 characters long and include at least one letter and one number.";

  }

  if (
    formData.cpassword !== "" &&
    formData.password !== formData.cpassword
  ) {

    newErrors.cpassword = "Passwords do not match.";

  }


setErrors(newErrors);
return Object.values(newErrors).every(error => error === "");

}

const handleFormSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
event.preventDefault();

//first we validate required fields
const fieldsValidation: boolean = validateForm()
if(!fieldsValidation){
return;
}

const userData: FormData =  {
fullName : formData.fullName.trim(),
email: formData.email.trim(),
password: formData.password,
cpassword: formData.cpassword
}

//if everything is fine
SetButtonLoading(true);

//then api call
try {

const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,userData,{
timeout: 10000
})

setShowSuccessDialog(true);
}
catch (error) {

  if (axios.isAxiosError(error) && error.response) {

    const { status, data } = error.response;

    if (status === 409) {
      toast.warning(data.message);
      return;
    }

    if (status === 400) {

      // Validation error for a specific field
      if (data.field) {
        setErrors(prev => ({
          ...prev,
          [data.field]: data.message,
        }));
        return;
      }

      // Generic bad request
      toast.error(data.message);
      return;
    }

    if (status === 500) {
      toast.error("Internal server error. Please try again later.");
      return;
    }
  }

  // Network error / server unreachable
  toast.error("Unable to connect to the server.");

} finally {
	SetButtonLoading(false);

}
}


  return (
    <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-20">

      {/* Left Side */}

      <FadeUp>

        <div className="hidden max-w-xl lg:block">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            <Sparkles className="h-4 w-4 text-violet-400" />
            Join CareerPilot AI
          </div>

          <h1 className="text-6xl font-bold leading-tight text-white">
            Your Career.
            <br />
            Powered by AI.
          </h1>

          <p className="mt-8 text-lg leading-8 text-zinc-400">
            Build resumes, practice interviews, discover career paths,
            and receive personalized AI guidance—all in one platform.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-violet-400" />
              <span className="text-zinc-300">
                AI Resume Analysis
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-violet-400" />
              <span className="text-zinc-300">
                Personalized Career Roadmaps
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-violet-400" />
              <span className="text-zinc-300">
                AI Mock Interviews
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-violet-400" />
              <span className="text-zinc-300">
                Skill Gap Analysis
              </span>
            </div>

          </div>

        </div>

      </FadeUp>

      {/* Right Side */}

      <FadeUp delay={0.2}>

        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#212121]/90 p-12 backdrop-blur-xl">

          {/* Your existing form starts here */}

          <div className="mb-8 flex flex-col items-center">

            <div className="mb-5 rounded-2xl bg-violet-500/10 p-4">
              <Sparkles className="h-8 w-8 text-violet-400" />
            </div>

            <h2 className="text-3xl font-bold text-white">
              Create your account
            </h2>

            <p className="mt-3 text-center text-zinc-400">
              Start building your career with AI today.
            </p>

          </div>

          {/* Keep your current form exactly as it is */}

          {/* ... */}

  <form onSubmit={handleFormSubmission} className="space-y-5">

  {/* Full Name */}

  <div>

    <label className="mb-2 block text-sm text-zinc-300">
      Full Name
			<span className="ml-1 text-red-500">*</span>

    </label>

    <input
      type="text"
			value={formData.fullName}
      placeholder="John Doe"
			onChange={(e) =>
      handleInputChange("fullName", e.target.value)
      }
      className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500"
			
    />
		{errors.fullName && (
		<p className="mt-2 text-sm text-red-400">
    {errors.fullName}
    </p>
		)}

  </div>

  {/* Email */}

  <div>

    <label className="mb-2 block text-sm text-zinc-300">
      Email Address
		<span className="ml-1 text-red-500">*</span>

    </label>

    <input
      type="email"
			value={formData.email}
      placeholder="john@example.com"
			onChange={(e) =>
			handleInputChange("email", e.target.value)
			}
      className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500"
    />
		{errors.email && (
		<p className="mt-2 text-sm text-red-400">
    {errors.email}
    </p>
		)}

  </div>

  {/* Password */}

  <div>

    <label className="mb-2 block text-sm text-zinc-300">
      Password
		<span className="ml-1 text-red-500">*</span>

    </label>

<div className="relative">

  <input
    type={showPassword ? "text" : "password"}
    value={formData.password}
    placeholder="••••••••"
    onChange={(e) =>
    handleInputChange("password", e.target.value)
    }
    className="
      w-full
      rounded-xl
      border
      border-white/10
      bg-[#171717]
      px-4
      py-3
      pr-12
      text-white
      outline-none
      focus:border-violet-500
    "
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-zinc-400
      hover:text-white
    "
  >
    {showPassword ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} />
    )}
  </button>

</div>

		{errors.password && (
		<p className="mt-2 text-sm text-red-400">
    {errors.password}
    </p>
		)}

  </div>

  {/* Confirm Password */}

  <div>

    <label className="mb-2 block text-sm text-zinc-300">
      Confirm Password
		<span className="ml-1 text-red-500">*</span>

    </label>

   <div className="relative">

    <input
    type={showConfirmPassword ? "text" : "password"}
			value={formData.cpassword}
      placeholder="••••••••"
			onChange={(e) =>
			handleInputChange("cpassword", e.target.value)
			}
      className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500"
    />

		 <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-zinc-400
      hover:text-white
    "
  >
    {showConfirmPassword ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} />
    )}
  </button>

	</div>
		{errors.cpassword && (
		<p className="mt-2 text-sm text-red-400">
    {errors.cpassword}
    </p>
		)}

  </div>

  {/* Register Button */}

  <Button
	disabled= { buttonLoading }
	className="mt-2 w-full rounded-full py-6">
	
	{buttonLoading ? (
		<>
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    Creating Account...
    </>
	) : (
		<>
    Create Account
    <ArrowRight className="ml-2 h-4 w-4" />
    </>
	)
}
    
  </Button>

  </form>

{/* Divider */}

{/* <div className="my-8 flex items-center">

  <div className="h-px flex-1 bg-white/10" />

  <span className="mx-4 text-sm text-zinc-500">
    OR
  </span>

  <div className="h-px flex-1 bg-white/10" />

</div> */}

{/* Google Button */}

{/* <Button
  variant="outline"
  className="w-full rounded-full border-white/10 bg-transparent py-6 text-white hover:bg-white/5"
>
  Continue with Google
</Button> */}

{/* Login Link */}

<p className="mt-8 text-center text-sm text-zinc-400">

  Already have an account?

  <Link
    href="/login"
    className="ml-2 font-medium text-violet-400 transition-colors hover:text-violet-300"
  >
    Sign In
  </Link>

</p>

        </div>

  </FadeUp>

	<SuccessDialog
  open={showSuccessDialog}
  onOpenChange={setShowSuccessDialog}
  title="Account Created Successfully 🎉"
  description="Your CareerPilot AI account has been created successfully. You can now sign in using your email and password."
  buttonText="Go to Login"
  onButtonClick={() => router.push("/login")}
  />

  </div>
		
  );
}