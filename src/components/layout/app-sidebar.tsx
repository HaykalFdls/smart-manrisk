'use client';
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  GitMerge,
  Landmark,
  Waves,
  ShieldAlert,
  ServerCog,
  ShieldCheck,
  FileText,
  Gavel,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const NavItemWithSubmenu = ({
  icon,
  title,
  submenu,
}: {
  icon: React.ReactNode;
  title: string;
  submenu: { name: string; href: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton className="justify-between w-full">
          <div className="flex items-center gap-2">
            {icon}
            <span>{title}</span>
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {submenu.map((item) => (
            <SidebarMenuSubItem key={item.name}>
              <SidebarMenuSubButton asChild>
                <Link href={item.href}>{item.name}</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
};

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <div className="flex h-full flex-col">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8 w-8 text-sidebar-primary"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5zM12 13.667L6.667 11 12 8.333 17.333 11 12 13.667z" />
            </svg>
            <span className="text-xl font-semibold text-sidebar-foreground">
              RiskWise
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <NavItemWithSubmenu 
              icon={<GitMerge />}
              title="Risk Integration"
              submenu={[
                { name: 'Overview', href: '#' },
                { name: 'Data Sources', href: '#' },
              ]}
            />
            <NavItemWithSubmenu 
              icon={<Landmark />}
              title="Credit & Investment"
              submenu={[
                { name: 'Portfolio', href: '#' },
                { name: 'Counterparties', href: '#' },
              ]}
            />
             <SidebarMenuItem>
              <SidebarMenuButton>
                <Waves />
                <span>Liquidity & Market</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <NavItemWithSubmenu 
              icon={<ShieldAlert />}
              title="Operational Risk"
              submenu={[
                { name: 'Incidents', href: '#' },
                { name: 'KRI', href: '#' },
              ]}
            />
            <NavItemWithSubmenu 
              icon={<ServerCog />}
              title="IT Risk Management"
              submenu={[
                { name: 'Cybersecurity', href: '#' },
                { name: 'System Audits', href: '#' },
              ]}
            />
            <NavItemWithSubmenu 
              icon={<ShieldCheck />}
              title="BCMS"
              submenu={[
                { name: 'Plans', href: '#' },
                { name: 'Tests', href: '#' },
              ]}
            />
             <SidebarMenuItem>
              <SidebarMenuButton>
                <FileText />
                <span>Regulation Update</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Gavel />
                <span>Governance & Compliance</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <Settings/>
                        <span>Settings</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <LogOut/>
                        <span>Logout</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
