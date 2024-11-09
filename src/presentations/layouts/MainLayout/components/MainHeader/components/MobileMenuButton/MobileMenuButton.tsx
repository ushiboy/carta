import { DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function MobileMenuButton() {
  return (
    <DisclosureButton
      data-testid="mobileMenuButton"
      className="group relative inline-flex items-center justify-center rounded-md bg-blue-600 p-2 text-gray-400 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
    >
      <span className="absolute -inset-0.5" />
      <span className="sr-only">Open main menu</span>
      <Bars3Icon
        aria-hidden="true"
        className="block h-6 w-6 group-data-[open]:hidden"
      />
      <XMarkIcon
        aria-hidden="true"
        className="hidden h-6 w-6 group-data-[open]:block"
      />
    </DisclosureButton>
  );
}
