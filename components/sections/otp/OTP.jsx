
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
export default function OTP() {
  return (

        <form
          className="w-full max-w-[420px]"
        >
          <div className="text-center">
            <h2 className="text-[24px] md:text-[26px] font-semibold text-[#111827]">
              Enter OTP
            </h2>
            <p className="mt-2 text-[15px] text-[#6b7280]">Code sent to</p>
          </div>
          <div className="my-8">
            <p className="text-[#545454]">Enter 4 digit code</p>
          </div>
          <div className="flex item-center justify-center my-5">
            <InputOTP maxLength={4} className="gap-3">
              <InputOTPGroup className="gap-3">
                <InputOTPSlot
                  index={0}
                  className="!ml-0 h-12 w-12 border border-gray-300 rounded-md bg-gray-100"
                />
                <InputOTPSlot
                  index={1}
                  className="!ml-0 h-12 w-12 border border-gray-300 rounded-md bg-gray-100"
                />
                <InputOTPSlot
                  index={2}
                  className="!ml-0 h-12 w-12 border border-gray-300 rounded-md bg-gray-100"
                />
                <InputOTPSlot
                  index={3}
                  className="!ml-0 h-12 w-12 border border-gray-300 rounded-md bg-gray-100"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex items-center justify-center">
            <Link href={"/newpassword"} className="w-full">
            <button
              type="submit"
              className="my-10 w-sm h-[48px] rounded-lg bg-[#7a4500] text-white text-[16px] font-medium tracking-wide shadow-md hover:opacity-95 active:translate-y-[1px] transition"
            >
              Verify
            </button>
            </Link>
          </div>
        </form>
     
    
  );
}
