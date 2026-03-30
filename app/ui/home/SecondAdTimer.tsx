"use client";
import {
  TranslatedDays,
  TranslatedHours,
  TranslatedMinutes,
  TranslatedSeconds,
} from "@ui/home/TranslatedUnits";
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
    return <span className="text-identity">Ad Expired!</span>;
  } else {
    return (
      <div className="flex gap-5 max-[990px]:gap-2 max-[990px]:justify-center">
        <div className="time">
          <span className="text-base font-semibold">{days}</span>
          <TranslatedDays />
        </div>
        <div className="time">
          <span className="text-base font-semibold">{hours}</span>
          <TranslatedHours />
        </div>
        <div className="time">
          <span className="text-base font-semibold">{minutes}</span>
          <TranslatedMinutes />
        </div>
        <div className="time">
          <span className="text-base font-semibold">{seconds}</span>
          <TranslatedSeconds />
        </div>
      </div>
    );
  }
};

const SecondAdTimer: FC<CountdownProps> = () => {
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

export default SecondAdTimer;
