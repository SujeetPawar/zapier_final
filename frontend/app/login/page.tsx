"use client";
import Appbar from "@/components/Appbar";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import CheckFeature from "@/components/CheckFeature";
import Input from "@/components/Input";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function () {

    const router = useRouter();
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
      <div className="flex pt-8 max-w-4xl">
        <div className="flex-1 px-4 pt-20">
          <div className="text-3xl  pb-4 font-semibold">
            Join millions worldwide who automate their work using Zapier.
          </div>
          <div className="pb-6 pt-4">
            <CheckFeature label={"Easy setup, no coding required"} />
          </div>
          <div className="pb-6">
            <CheckFeature label={"Free forever for core features"} />
          </div>

          <div className="pb-6">
            <CheckFeature label={"14-day trial of premium features & apps"} />
          </div>
        </div>
        <div className="flex-1 pt-6 pb-6 mt-12 border rounded px-4" >
          <Input
            label={"Email"}
            onChange={(e) => {
                setEmail(e.target.value)
            }}
            type="email"
            placeholder="Your Email"
          />
          <Input
            label={"Password"}
            onChange={(e) => {
                setPassword(e.target.value)
            }}
            type="password"
            placeholder="Your Password"
          />
        <div className="pt-4 ">
        <PrimaryButton onClick={async ()=>{
            const res = await axios.post(`${BACKEND_URL}api/v1/user/signin`, {
                username: email ,
                password:password,
            });
            localStorage.setItem("token" , res.data.token);
            router.push("/dashboard")
          }} size="big">Login</PrimaryButton>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}
