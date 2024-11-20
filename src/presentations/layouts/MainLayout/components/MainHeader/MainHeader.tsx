import { Disclosure } from "@headlessui/react";

import logoImage from "@/assets/images/carta.svg";

import { ConfigMenu } from "./components/ConfigMenu";
import { MobileMainMenu } from "./components/MobileMainMenu";
import { MobileMenuButton } from "./components/MobileMenuButton";
import { Navigation } from "./components/Navigation";

export function MainHeader() {
  const navigation = [
    { name: "Home", path: "/", current: true },
    { name: "Score", path: "/scores", current: false },
  ];
  const configNavigation = [{ name: "Manage Data", path: "/manage" }];

  return (
    <Disclosure data-testid="mainHeader" as="nav" className="bg-blue-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <img alt="Logo" src={logoImage} className="h-8 w-8" />
            </div>
            <div className="hidden md:block">
              <Navigation navigations={navigation} />
            </div>
          </div>
          <div className="hidden md:block">
            <ConfigMenu configs={configNavigation} />
          </div>
          <div className="-mr-2 flex md:hidden">
            <MobileMenuButton />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <MobileMainMenu navigations={navigation} configs={configNavigation} />
      </div>
    </Disclosure>
  );
}
