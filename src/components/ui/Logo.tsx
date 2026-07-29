import Image from "next/image";
import clsx from "clsx";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={clsx("inline-flex items-center", className)}>
      <Image
        src="/images/ap-mark.png"
        alt="AP Autoservis Č.K"
        width={1164}
        height={175}
        className="h-7 w-auto sm:h-8"
        priority
      />
    </span>
  );
}
