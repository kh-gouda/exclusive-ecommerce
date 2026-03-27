"use client";
import {
  TranslatedDays,
  TranslatedHours,
  TranslatedMinutes,
  TranslatedSeconds,
} from "@ui/home/TranslatedUnits";
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
            <TranslatedDays />
          </p>
          <p className={`${inter.className} font-bold text-[32px]`}>{days}</p>
        </div>
        <span className="text-identity">:</span>
        <div>
          <p className={`${poppins.className} font-medium text-xs mb-1`}>
            <TranslatedHours />
          </p>
          <p className={`${inter.className} font-bold text-[32px]`}>{hours}</p>
        </div>
        <span className="text-identity">:</span>
        <div>
          <p className={`${poppins.className} font-medium text-xs mb-1`}>
            <TranslatedMinutes />
          </p>
          <p className={`${inter.className} font-bold text-[32px]`}>
            {minutes}
          </p>
        </div>
        <span className="text-identity">:</span>
        <div>
          <p className={`${poppins.className} font-medium text-xs mb-1`}>
            <TranslatedSeconds />
          </p>
          <p className={`${inter.className} font-bold text-[32px]`}>
            {seconds}
          </p>
        </div>
      </div>
    );
  }
};

const FlashSalesTimer: FC<CountdownProps> = () => {
  const [isClient, setIsClient] = useState(false);

  const setClient = useEffectEvent(() => setIsClient(true));

  useEffect(() => {
    setClient();
  }, []);

  if (!isClient) {
    return null;
  }

  const date = new Date();
  date.setDate(date.getDate() + 4);
  return <Countdown date={date} renderer={renderer} />;
};

export default FlashSalesTimer;
