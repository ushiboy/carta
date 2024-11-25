import { useCallback } from "react";
import { tv } from "tailwind-variants";

import { ToriFudaInfo, ToriFudaStatus } from "@/domains/models/carta";

type Props = {
  info: ToriFudaInfo;
  onClick: (toriFuda: ToriFudaInfo) => void;
};

const card = tv({
  base: "h-16 w-full border-green-900 border-4 md:border-8 rounded-sm shadow-lg flex items-center justify-center  transition duration-200 md:h-32 md:w-64",
  variants: {
    hoverable: {
      true: "hover:scale-105 hover:shadow-xl",
      false: "",
    },
    status: {
      [ToriFudaStatus.Default]: "",
      [ToriFudaStatus.Corrected]:
        "bg-emerald-200 border-emerald-500 cursor-not-allowed",
      [ToriFudaStatus.Incorrected]:
        "bg-red-200 border-red-600 cursor-not-allowed",
    },
  },
  defaultVariants: {
    hoverable: true,
  },
});

export function ToriFuda({ info, onClick }: Props) {
  const { status } = info;
  const clickable = status === ToriFudaStatus.Default;
  const handleClick = useCallback(
    () => clickable && onClick(info),
    [info, clickable, onClick],
  );
  return (
    <div
      data-testid="toriFuda"
      role="button"
      tabIndex={0}
      className={card({ status: status, hoverable: clickable })}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <p className="text-xl font-semibold">{info.text}</p>
    </div>
  );
}
