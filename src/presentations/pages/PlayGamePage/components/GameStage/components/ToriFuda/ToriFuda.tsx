import { useCallback } from "react";
import { tv } from "tailwind-variants";

import { ToriFudaInfo, ToriFudaStatus } from "@/domains/models/carta";

type Props = {
  info: ToriFudaInfo;
  onClick: (toriFuda: ToriFudaInfo) => void;
};

const card = tv({
  base: "rounded-lg shadow-lg p-6 flex items-center justify-center border transition duration-200",
  variants: {
    size: {
      sm: "w-32 h-20",
      md: "w-64 h-32",
      lg: "w-96 h-48",
    },
    hoverable: {
      true: "hover:bg-gray-100 cursor-pointer",
      false: "",
    },
    status: {
      [ToriFudaStatus.Default]: "border-gray-400",
      [ToriFudaStatus.Corrected]:
        "bg-green-300 border-green-500 cursor-not-allowed",
      [ToriFudaStatus.Incorrected]:
        "bg-red-300 border-red-500 cursor-not-allowed",
    },
  },
  defaultVariants: {
    size: "md",
    hoverable: true,
    selected: false,
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
