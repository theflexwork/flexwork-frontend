"use client";

import { Barcode } from "lucide-react";
import Link from "next/link";

import AppLogo from "@/components/app-logo";
import { MenuClassic } from "@/components/themes/sidebar/menu/menu-classic";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useConfig } from "@/hooks/use-config";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMobileMenuConfig } from "@/hooks/use-mobile-menu";

export function SheetMenu() {
  const [mobileMenuConfig, setMobileMenuConfig] = useMobileMenuConfig();
  const [config, setConfig] = useConfig();
  const { isOpen } = mobileMenuConfig;

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  if (isDesktop) return null;
  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => setMobileMenuConfig({ isOpen: !isOpen })}
    >
      <SheetTrigger className="xl:hidden" asChild>
        <Button
          className="h-8"
          variant="ghost"
          size="icon"
          onClick={() =>
            setConfig({
              ...config,
              collapsed: false,
            })
          }
        >
          <Barcode className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Link
            href="/dashboard/analytics"
            className="flex gap-2 items-center     "
          >
            <AppLogo className="  text-default-900 h-8 w-8 [&>path:nth-child(3)]:text-background [&>path:nth-child(2)]:text-background" />
            <h1 className="text-xl font-semibold text-default-900 ">
              Flexwork
            </h1>
          </Link>
        </SheetHeader>
        <MenuClassic />
      </SheetContent>
    </Sheet>
  );
}
