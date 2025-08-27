
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';

const divisionData = [
  {
    division: 'Teknologi Informasi',
    total: 500,
  },
  {
    division: 'Pengendalian Keuangan',
    total: 350,
  },
  {
    division: 'Kepatuhan',
    total: 280,
  },
  {
    division: 'Sumber Daya Insani',
    total: 320,
  },
  {
    division: 'Operasional',
    total: 970,
  },
];

export default function RiskRegisterPage() {
  const router = useRouter();

  const handleDivisionClick = (division: string) => {
    // Later, this can navigate to a detailed page, e.g.:
    // router.push(`/risk-register/${encodeURIComponent(division)}`);
    alert(`Menampilkan detail untuk divisi: ${division}`);
  };

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Risk Register</h1>
      </div>
      <div className="max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Operational Risk Register</CardTitle>
            <CardDescription>
              Total Risk Event / Potensi Risiko per Divisi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Divisi</TableHead>
                  <TableHead className="text-right">Total RE/PR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {divisionData.map((item) => (
                  <TableRow
                    key={item.division}
                    className="cursor-pointer"
                    onClick={() => handleDivisionClick(item.division)}
                  >
                    <TableCell className="font-medium">
                      {item.division}
                    </TableCell>
                    <TableCell className="text-right">{item.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
