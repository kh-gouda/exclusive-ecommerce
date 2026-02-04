"use client";
import { inter, poppins } from "@ui/shared/fonts";
import { FC, useEffect, useEffectEvent, useState } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";

interface CountdownProps {
  targetDate: string;
}

const renderer: CountdownRendererFn = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}) => {
  if (completed) {
    return <span className="text-identity">Flash Sales Expired!</span>;
  } else {
    return (
      <div className="flex items-center gap-2 *:text-center">
        <div>
          <p className={`${poppins.className} font-medium text-xs mb-1`}>
            Days
          </p>
          <p className={`${inter.className} font-bold text-[32px]`}>{days}</p>
        </div>
        <span className="text-identity">:</span>
        <div>
          <p className={`${poppins.className} font-medium text-xs mb-1`}>
            Hours
          </p>
          <p className={`${inter.className} font-bold text-[32px]`}>{hours}</p>
        </div>
        <span className="text-identity">:</span>
        <div>
          <p className={`${poppins.className} font-medium text-xs mb-1`}>
            Minutes
          </p>
          <p className={`${inter.className} font-bold text-[32px]`}>
            {minutes}
          </p>
        </div>
        <span className="text-identity">:</span>
        <div>
          <p className={`${poppins.className} font-medium text-xs mb-1`}>
            Seconds
          </p>
          <p className={`${inter.className} font-bold text-[32px]`}>
            {seconds}
          </p>
        </div>
      </div>
    );
  }
};

const FlashSalesTimer: FC<CountdownProps> = ({ targetDate }) => {
  const [isClient, setIsClient] = useState(false);

  const setClient = useEffectEvent(() => setIsClient(true));

  useEffect(() => {
    setClient();
  }, []);

  if (!isClient) {
    return null;
  }

  return <Countdown date={new Date(targetDate)} renderer={renderer} />;
};

export default FlashSalesTimer;
