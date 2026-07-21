
"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Loader2 } from "lucide-react"

import FadeUp from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function LoginForm() {
const router = useRouter()
	interface LoginData {
		email: string,
		password: string
	}

	interface LoginErrors {
		email: string,
		password: string
	}
	
	
	const [loginData,setLoginData] = useState <LoginData>({
  email : "",
	password : ""
	})
 
	const [loginErrors,setLoginErrors] = useState <LoginErrors>({
	email: "",
	password: ""
	})

const [buttonLoading,setButtonLoading] = useState(false);

const validateForm = (): boolean => {
	const newLoginErrors: LoginErrors = {
		email: "",
		password: ""
	}

	Object.entries(loginData).forEach(([field,value]) => {
		if(value.trim() === ""){
			newLoginErrors[field as keyof LoginErrors]  = "This field is required"
		}
		
	})
	// const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// if(loginData.email.trim() !== "" && !emailRegex.test(loginData.email.trim())){
  // newLoginErrors.email = "Please enter a valid email address.";
	// }

	setLoginErrors(newLoginErrors)
	return Object.values(newLoginErrors).every(error => error === "")
}

const handleOnChange = (elementName: keyof LoginData, value: string) => {
		setLoginData(prev => ({
			...prev,
			[elementName] : value
		}))

		setLoginErrors(prev => ({
			...prev,
			[elementName] : ""
		}))

	}

const handleLoginSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
	event.preventDefault();

	//required fields checking
	const isValid: boolean = validateForm();
	if(!isValid){
		return;
	}

	const userData: LoginData = {
		email: loginData.email.trim(),
		password: loginData.password
	}

	setButtonLoading(true);

	try {

		const response  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,userData,{
		withCredentials: true,
    timeout: 10000,
		})

		router.replace("/dashboard");
	

	} catch (error) {
		if (axios.isAxiosError(error)) {

    const status = error.response?.status;
    const data = error.response?.data;

		console.log("Status:", error.response?.status);
		console.log("Data:", error.response?.data);

    switch (status) {

      case 400:
        if (data?.field) {
          setLoginErrors(prev => ({
            ...prev,
            [data.field]: data.message,
          }));
        } else {
          toast.error(data?.message || "Bad request.");
        }
        break;

      case 401:
        toast.error(data?.message || "Invalid email or password.");
        break;

      case 429:
        toast.warning(data?.message || "Too many requests. Please try again later.");
        break;

      case 500:
        toast.error("Something went wrong. Please try again later.");
        break;

      default:
        toast.error("Unexpected error occurred.");
    }

  } else {
    toast.error("Network error. Please check your internet connection.");
  }
		
	} finally {
		setButtonLoading(false);
	}




	}


  return (
    <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-20">

      {/* Left Side */}

      <FadeUp>

        <div className="hidden max-w-xl lg:block">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            <Sparkles className="h-4 w-4 text-violet-400" />
            Welcome Back
          </div>

          <h1 className="text-6xl font-bold leading-tight text-white">
            Continue Your
            <br />
            Career Journey.
          </h1>

          <p className="mt-8 text-lg leading-8 text-zinc-400">
            Sign in to access your AI career dashboard, resume analysis,
            interview preparation, and personalized learning roadmap.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-violet-400" />
              <span className="text-zinc-300">
                Resume Analyzer
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
                Career Roadmaps
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-violet-400" />
              <span className="text-zinc-300">
                Track Your Progress
              </span>
            </div>

          </div>

        </div>

      </FadeUp>

      {/* Right Side */}

      <FadeUp delay={0.2}>

        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#212121]/90 p-10 backdrop-blur-xl">

          {/* Header */}

          <div className="mb-8 flex flex-col items-center">

            <div className="mb-5 rounded-2xl bg-violet-500/10 p-4">
              <Sparkles className="h-8 w-8 text-violet-400" />
            </div>

            <h2 className="text-3xl font-bold text-white">
              Welcome Back
            </h2>

            <p className="mt-3 text-center text-zinc-400">
              Sign in to continue your AI-powered career journey.
            </p>

          </div>

          {/* Login Form */}

          <form onSubmit={handleLoginSubmission}
					 className="space-y-6">

            <div>

              <label className="mb-2 block text-sm text-zinc-300">
                Email Address
              </label>

              <input
                type="email"
								value={loginData.email}
								onChange={(e) => {
								handleOnChange("email",e.target.value)
								}
								}
                placeholder="john@example.com"
                className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500"
              />

							{loginErrors.email && (
							<p className="mt-2 text-sm text-red-400">
							{loginErrors.email}
							</p>
								)
								}

            </div>

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label className="text-sm text-zinc-300">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-violet-400 hover:text-violet-300"
                >
                  Forgot Password?
                </Link>

              </div>

              <input
                type="password"
								value={loginData.password}
								onChange={(e) => {
									handleOnChange("password",e.target.value)
								}
								}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500"
              />
							{
								loginErrors.password && (
								<p className="mt-2 text-sm text-red-400">
								{loginErrors.password}
								</p>
								)
							}

            </div>

					

            <Button disabled={buttonLoading} className="w-full rounded-full py-6">

              {buttonLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Signing In...
									</>
								) : (
									<>
										Sign In
										<ArrowRight className="ml-2 h-4 w-4" />
									</>
								)}

            </Button>

          </form>

          {/* Divider */}

          <div className="my-8 flex items-center">

            <div className="h-px flex-1 bg-white/10" />

            <span className="mx-4 text-sm text-zinc-500">
              OR
            </span>

            <div className="h-px flex-1 bg-white/10" />

          </div>

          {/* Google */}

          <Button
            variant="outline"
            className="w-full rounded-full border-white/10 bg-transparent py-6 text-white hover:bg-white/5"
          >
            Continue with Google
          </Button>

          {/* Footer */}

          <p className="mt-8 text-center text-sm text-zinc-400">

            Don't have an account?

            <Link
              href="/signup"
              className="ml-2 font-medium text-violet-400 hover:text-violet-300"
            >
              Create Account
            </Link>

          </p>

        </div>

      </FadeUp>

    </div>
  );
}