"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SubChildren } from "@/lib/menus";
import { cn } from "@/lib/utils";
import { IconType } from "@/types/ui-components";

interface CollapseMenuButtonProps {
  icon: IconType;
  label: string;
  active: boolean;
  submenus: SubChildren[];
}

export function CollapseMenuButton2({
  icon,
  label,
  active,
  submenus,
}: CollapseMenuButtonProps) {
  const pathname = usePathname();
  const isSubmenuActive = submenus.some(
    (submenu) => submenu.active || pathname.startsWith(submenu.href),
  );
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  const Icon = icon;
  return (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
      <CollapsibleTrigger className=" mb-1" asChild>
        <div className=" flex items-center group [&[data-state=open]>button>div>div>svg]:rotate-180">
          <Button
            variant={active ? "default" : "ghost"}
            color={active ? "default" : "secondary"}
            className={cn("justify-start capitalize md:px-3 px-3 h-10", {
              "group-data-[state=open]:bg-secondary": !active,
            })}
          >
            <div className="w-full items-center flex justify-between">
              <div className="flex items-center">
                {Icon && (
                  <span className="me-4">
                    <Icon className="h-5 w-5" />
                  </span>
                )}
                <p className={cn("max-w-[150px] truncate")}>{label}</p>
              </div>
              <div className={cn("whitespace-nowrap")}>
                <ChevronDown
                  size={18}
                  className="transition-transform duration-200"
                />
              </div>
            </div>
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus.map(({ href, label, active }, index) => (
          <Button
            key={index}
            color="secondary"
            variant="ghost"
            className={cn(
              "w-full justify-start  h-auto mb-3 md:px-3 px-3 hover:bg-transparent first:mt-2",
              {
                "opacity-100": active,
                "dark:opacity-75": !active,
              },
            )}
            asChild
          >
            <Link href={href}>
              <span
                className={cn(
                  "h-1.5 w-1.5 me-3 rounded-full  transition-all duration-150 ring-0   bg-default-300 dark:bg-default   dark:ring-menu-arrow-active  ring-default-300",
                  {
                    "ring-4 bg-default ring-opacity-30 ring-default": active,
                  },
                )}
              ></span>
              <p className={cn("max-w-[170px] truncate")}>{label}</p>
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
