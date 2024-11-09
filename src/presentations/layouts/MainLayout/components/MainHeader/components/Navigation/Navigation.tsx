import { Link } from "react-router-dom";
import { tv } from "tailwind-variants";

const nav = tv({
  base: "rounded-md px-3 py-2 text-sm font-medium",
  variants: {
    current: {
      true: "bg-blue-700 text-white",
      false: "text-blue-100 hover:bg-blue-700 hover:text-white",
    },
  },
  defaultVariants: {
    current: false,
  },
});

type Props = {
  navigations: {
    name: string;
    path: string;
    current: boolean;
  }[];
};

export function Navigation({ navigations }: Props) {
  return (
    <div className="ml-10 flex items-baseline space-x-4">
      {navigations.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          aria-current={item.current ? "page" : undefined}
          className={nav({ current: item.current })}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
