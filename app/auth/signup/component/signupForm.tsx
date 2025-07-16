"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { School, User } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type Role = "Student" | "Faculty" | "Alumni";

export default function SignUpForm() {
  const [selectedRole, setSelectedRole] = useState<Role | " ">(" ");
  const [universities, setUniversities] = useState<number | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roles: Role[] = ["Student", "Faculty", "Alumni"];

  const handleSelect = (roles: Role) => {
    setSelectedRole(roles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (selectedRole === " ") {
      setError("Please select your role");
      return;
    }

    const domainMap: Record<number, string> = {
      1: "gbox.adnu.edu.ph", // ADNU
      2: "usi.edu.ph", // USI
      3: "ncf.edu.ph", // NCF
      4: "biscast.edu.ph", // BISCAST
      5: "unc.edu.ph", // UNC
    };

    if (
      (selectedRole === "Student" || selectedRole === "Faculty") &&
      universities
    ) {
      const requiredDomain = domainMap[universities];
      if (!email.endsWith("@" + requiredDomain)) {
        setError(
          `Email must end with @${requiredDomain} for your selected university.`
        );
        return;
      }
    }

    try {
      setLoading(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "applications/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          universities,
          role: selectedRole.toLowerCase(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Registration Successful:", result.message);
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Registration Failed:", err);
      setError("Network or Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side (Text & Form) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-10 md:px-16 bg-white">
        {/* Logo */}
        <div className="absolute top-10">
          <Image src="/logo.png" alt="EduCart Logo" width={170} height={120} />
        </div>
        <div className="max-w-md w-full mx-auto">
          {/* Text and Form */}
          <div className="flex flex-col text-center">
            <h1 className="text-2xl font-semibold mb-2">Create an Account</h1>
            <p className="text-sm mb-6">
              Join your university&apos; trusted marketplace
            </p>
          </div>

          <form className="space-y-4">
            <div>
              {/* SELECTING ROLE */}
              <Label htmlFor="Role" className="mb-3">
                I am a/an:
              </Label>
              <div className="w-full flex items-center justify-between">
                {roles.map((role: Role) => (
                  <Button
                    key={role}
                    onClick={() => handleSelect(role)}
                    className={`px-10 py-2 border rounded cursor-pointer
                      ${
                        selectedRole === role
                          ? "border-[#BA3A2C] text-[#BA3A2C] font-medium bg-transparent "
                          : "bg-transparent text-[#B7B7B7] border-[#D9D9D9]"
                      }
                      hover:border-[#BA3A2C] hover:text-[#BA3A2C] hover:bg-white transition`}
                    type="button"
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>

            {/* SELECT UNIVERSITY */}
            <div className="mb-3">
              <label
                htmlFor="university"
                className="block mb-2 font-medium text-black"
              >
                University:
              </label>

              {/* Wrapper for icon + select */}
              <div className="flex items-center border border-[#D9D9D9] rounded px-3 py-0 w-full">
                {/* Icon */}
                <span className="text-[#B7B7B7] mr-2">
                  <School className="w-5 h-5" />
                </span>

                {/* Shadcn Select */}
                <Select
                  name="universities"
                  value={universities?.toString() ?? ""}
                  onValueChange={(value) => setUniversities(Number(value))}
                  required
                >
                  <SelectTrigger className="w-full border-0 px-0 py-0 shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 data-[state=open]:ring-0 data-[state=open]:ring-offset-0">
                    <SelectValue placeholder="Select University" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">ADNU</SelectItem>
                    <SelectItem value="2">USI</SelectItem>
                    <SelectItem value="3">NCF</SelectItem>
                    <SelectItem value="4">BISCAST</SelectItem>
                    <SelectItem value="5">UNC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* INPUT FULL NAME */}
            <div>
              <Label htmlFor="Full Name" className="mb-3">
                Full Name:
              </Label>
              <div className="flex items-center border border-[#D9D9D9] rounded px-3 py-2 w-full">
                {/* Icon */}
                <span className="text-[#B7B7B7]">
                  <User className="w-5 h-5" />
                </span>

                {/* Input */}
                <input
                  name="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.currentTarget.value)}
                  placeholder="Full Name"
                  required
                  className="w-full ml-2 text-sm placeholder-[#B7B7B7] focus:outline-none"
                />
              </div>
            </div>

            {/* INPUT EMAIL ADDRESS */}
            <div className="flex flex-col gap-0">
              <Label htmlFor="Email" className="mb-3">
                Email:
              </Label>
              <div className="flex items-center border border-[#D9D9D9] rounded px-3 py-2 w-full">
                {/* Icon */}
                <span className="text-[#B7B7B7]">
                  <User className="w-5 h-5" />
                </span>

                {/* Input */}
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  placeholder="@university.edu.ph"
                  required
                  className="w-full ml-2 text-sm placeholder-[#B7B7B7] focus:outline-none"
                />
              </div>
              <span className="text-[11px] text-[#696969] mt-0">
                Please use your university email for verification
              </span>
            </div>

            {/* INPUT PASSWORD */}
            <div>
              <Label htmlFor="Password" className="mb-3">
                Password:
              </Label>
              <div className="flex items-center border border-[#D9D9D9] rounded px-3 py-2 w-full">
                {/* Icon */}
                <span className="text-[#B7B7B7]">
                  <User className="w-5 h-5" />
                </span>

                {/* Input */}
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Enter Password"
                  required
                  className="w-full ml-2 text-sm placeholder-[#B7B7B7] focus:outline-none"
                />
              </div>
            </div>

            {/* INPUT CONFIRM PASSWORD */}
            <div>
              <Label htmlFor="Confirm Password" className="mb-3">
                Confirm Password:
              </Label>
              <div className="flex items-center border border-[#D9D9D9] rounded px-3 py-2 w-full">
                {/* Icon */}
                <span className="text-[#B7B7B7]">
                  <User className="w-5 h-5" />
                </span>

                {/* Input */}
                <input
                  name="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                  placeholder="Confirm Password"
                  required
                  className="w-full ml-2 text-sm placeholder-[#B7B7B7] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox id="terms" className="text-[#BA3A2C]" required />
              <Label htmlFor="terms" className="font-light text-[13px]">
                I agree with the
                <span className="text-[#BA3A2C]">Terms of Service</span> and
                <span className="text-[#BA3A2C]">Privacy Policy</span>
              </Label>
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#BA3A2C] text-white py-2 rounded hover:bg-[#BA3A2C] cursor-pointer"
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-[#BA3A2C] font-medium">
              Sign In
            </a>
          </p>

          <footer className="md:hidden text-black text-xs text-center">
            © 2025 EduCart. All rights reserved.
          </footer>
        </div>
      </div>

      {/* Right Side (Full Height Image Section) */}
      <div className="w-1/2 h-screen bg-[#621C14] relative hidden md:block">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/logo2.png"
            alt="EduCart Logo"
            width={1000}
            height={120}
          />
          <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs">
            © 2025 EduCart. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
