"use client";
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
      <div className="flex gap-5">
        <div className="time">
          <span className="text-base font-semibold">{days}</span>
          <span className="text-xs">Days</span>
        </div>
        <div className="time">
          <span className="text-base font-semibold">{hours}</span>
          <span className="text-xs">Hours</span>
        </div>
        <div className="time">
          <span className="text-base font-semibold">{minutes}</span>
          <span className="text-xs">Minutes</span>
        </div>
        <div className="time">
          <span className="text-base font-semibold">{seconds}</span>
          <span className="text-xs">Seconds</span>
        </div>
      </div>
    );
  }
};

const SecondAdTimer: FC<CountdownProps> = ({ targetDate }) => {
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

export default SecondAdTimer;
