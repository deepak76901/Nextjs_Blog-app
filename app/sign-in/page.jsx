"use client"

import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "@/redux/user/userSlice";
// import OAuth from "../components/OAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const router = useRouter()
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill up all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        router.push("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto md:gap-5 flex-col md:flex-row md:items-center ">
        {/*left div */}
        <div className="flex-1">
          <Link href="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-600 to-red-500 rounded-md text-white">
              CuriousCanvas
            </span>
          </Link>
          <p className="text-sm mt-5">
            This is a best platform to find and push your query and knowledge to
            audiance. You can sign in with your Email and Password or Google.
          </p>
        </div>
        {/*right div */}
        <div className="flex-1">
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-2">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            {/* <OAuth /> */}
          </form>
          <div className="flex gap-2 text-sm mt-3">
            <span>Create an Account.</span>
            <Link href="/sign-up" className="text-blue-800 font-semibold">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
