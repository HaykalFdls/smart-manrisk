
'use client';
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  ShieldAlert,
} from 'lucide-react';
import KpiCard from '@/components/dashboard/kpi-card';
import RiskChart from '@/components/dashboard/risk-chart';

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your SMART Dashboard.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Sales"
          value="$45,231.89"
          description="+20.1% from last month"
          Icon={DollarSign}
        />
        <KpiCard
          title="Subscriptions"
          value="+2350"
          description="+180.1% from last month"
          Icon={Users}
        />
        <KpiCard
          title="Credit Risk"
          value="12,234"
          description="+19% from last month"
          Icon={CreditCard}
        />
        <KpiCard
          title="Active Now"
          value="+573"
          description="+201 since last hour"
          Icon={Activity}
        />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-8">
        <RiskChart />
      </div>
    </div>
  );
}
