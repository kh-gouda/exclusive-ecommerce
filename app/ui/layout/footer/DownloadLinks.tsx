import Image from "next/image";

export default function Downloadlinks() {
  return (
    <div className="min-w-49.5">
      <h3 className="text-white-text font-medium text-xl">Download App</h3>
      <p className="text-gray-500 font-medium text-xs mt-6 mb-2">
        Save $3 with App New User Only
      </p>
      <div className="flex gap-2 items-center">
        <Image width={80} height={80} src="/images/Qrcode.webp" alt="qr code" />
        <div>
          <Image
            width={110}
            height={40}
            src="/images/google_play_store_logo.webp"
            alt="google_play_store_logo"
            className="mb-1 border border-white-text rounded-sm cursor-pointer"
          />
          <Image
            width={110}
            height={40}
            src="/images/apple_store_logo.webp"
            alt="apple_store_logo"
            className="border border-white-text rounded-sm cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between *:cursor-pointer">
        <Image
          width={24}
          height={24}
          src="/images/icon-facebook.png"
          alt="facebook icon"
        />
        <Image
          width={24}
          height={24}
          src="/images/icon-twitter.png"
          alt="twitter icon"
        />
        <Image
          width={24}
          height={24}
          src="/images/icon-instagram.png"
          alt="instagram icon"
        />
        <Image
          width={24}
          height={24}
          src="/images/icon-linkedin.png"
          alt="linkedin icon"
        />
      </div>
    </div>
  );
}
