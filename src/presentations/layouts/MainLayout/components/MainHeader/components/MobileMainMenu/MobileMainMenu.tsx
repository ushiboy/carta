import { DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Link } from "react-router";
import { tv } from "tailwind-variants";

const nav = tv({
  base: "rounded-md px-3 py-2 font-medium block text-base",
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
  configs: {
    name: string;
    path: string;
  }[];
};

export function MobileMainMenu({ navigations, configs }: Props) {
  return (
    <DisclosurePanel data-testid="mobileMainMenus">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        {navigations.map((item) => (
          <DisclosureButton
            key={item.name}
            as={Link}
            to={item.path}
            aria-current={item.current ? "page" : undefined}
            className={nav({ current: item.current })}
          >
            {item.name}
          </DisclosureButton>
        ))}
      </div>
      <div className="border-t border-blue-700 pb-3 pt-4">
        <div className="mt-1 space-y-1 px-2">
          {configs.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.path}
              className="block rounded-md px-3 py-2 text-base font-medium text-blue-100 hover:bg-blue-600 hover:text-white"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </div>
    </DisclosurePanel>
  );
}
