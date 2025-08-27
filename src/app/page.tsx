import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Bell,
  Search,
  Users,
  CreditCard,
  Settings,
  LogOut,
  ArrowUpRight,
  ShieldAlert,
  ServerCog,
  Gavel,
} from 'lucide-react';
import KpiCard from '@/components/dashboard/kpi-card';
import RiskChart from '@/components/dashboard/risk-chart';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
                  <AvatarFallback>RM</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Overall Risk Score"
            value="7.2"
            description="+2.1% from last month"
            Icon={ArrowUpRight}
            iconColor="text-red-500"
          />
          <KpiCard
            title="Credit Risk Exposure"
            value="$1.2M"
            description="-5.4% from last month"
            Icon={ArrowUpRight}
            iconDirection="down"
            iconColor="text-green-500"
          />
          <KpiCard
            title="Operational Incidents"
            value="12"
            description="+3 since last week"
            Icon={ShieldAlert}
          />
          <KpiCard
            title="Compliance Status"
            value="98.5%"
            description="All regulations met"
            Icon={Gavel}
            iconColor="text-green-500"
          />
        </div>
        <div className="mt-6">
          <RiskChart />
        </div>
      </main>
    </div>
  );
}
