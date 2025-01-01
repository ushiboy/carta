import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

type Props = {
  configs: {
    name: string;
    path: string;
  }[];
};
export function ConfigMenu({ configs }: Props) {
  return (
    <div className="ml-4 flex items-center md:ml-6">
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton
            data-testid="configMenuButton"
            className="relative flex max-w-xs items-center rounded-full bg-blue-500 text-sm text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open config menu</span>
            <Cog8ToothIcon aria-hidden="true" className="h-6 w-6" />
          </MenuButton>
        </div>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          {configs.map((item) => (
            <MenuItem key={item.name}>
              <Link
                to={item.path}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
              >
                {item.name}
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
