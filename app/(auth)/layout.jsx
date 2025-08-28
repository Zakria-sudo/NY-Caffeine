import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="fixed inset-0 grid grid-cols-1 md:grid-cols-2 bg-white">
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src="/bglogo.png"
          alt="NY Caffeine storefront"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute left-6 top-6 h-12 w-12 md:h-14 md:w-14 bg-[#7B4606] rounded-full overflow-hidden">
          <Image
            src="/coffeecup.png"
            alt="NY Caffeine Badge"
            fill
            sizes="56px"
            className="object-contain"
          />
        </div>

        <div className="absolute left-6 md:left-8 right-6 bottom-20 md:bottom-40 text-white">
          <h1 className="font-semibold leading-tight tracking-tight text-[34px] md:text-[44px]">
            All Your Cravings
            <br />
            in One Place
          </h1>
          <p className="mt-4 text-[16px] md:text-[18px] opacity-90">
            NY Caffeine – More Than Just Coffee
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-[420px]">{children}</div>
      </div>
    </div>
  );
}
