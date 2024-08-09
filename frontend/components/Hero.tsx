"use client";
import { useRouter } from "next/navigation";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import Feature from "./Feature";

const Hero = () => {
    const router = useRouter();
  return (
    <div>
      <div className="flex justify-center">
        <div className="text-5xl font-medium pt-8 text-center max-w-xl">
          Automate as fast as you can type
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <div className="text-xl font-normal pt-8 text-center max-w-3xl">
          AI gives you automation superpowers, and Zapier puts them to work.
          Pairing AI and Zapier helps you turn ideas into workflows and bots
          that work for you.
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <div className="flex">
          <PrimaryButton onClick={() => {
            router.push("/signup")
          }} size="big">
            Get Started Free
          </PrimaryButton>
          <div className="pl-4">
            <SecondaryButton onClick={() => {}} size="big">
              Contact Sales
            </SecondaryButton>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-6 mt-2">
            <Feature title={"Free Forever"} subTitle={"for core features"} />
            <Feature title={"More apps"} subTitle={"than any other platform"} />
            <Feature title={"AI features"} subTitle={"Cutting-edge "} />
      </div>
    </div>
  );
};

export default Hero;
