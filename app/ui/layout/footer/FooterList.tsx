import { FOOTER_LIST } from "@/app/lib/typeDefinitions";
import Link from "next/link";

export default function FooterList({ listHeading, listItems }: FOOTER_LIST) {
  return (
    <ul>
      <li className="text-white-text font-medium text-xl">{listHeading}</li>
      {listItems.map((item) => {
        if (typeof item === "string") {
          return (
            <li key={item} className="text-white-text text-base my-6">
              {item}
            </li>
          );
        } else {
          return (
            <li key={item.name} className="text-white-text text-base my-6">
              <Link href={item.link}>{item.name}</Link>
            </li>
          );
        }
      })}
    </ul>
  );
}
