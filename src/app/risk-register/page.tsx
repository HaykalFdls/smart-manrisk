'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';

import { fetchRisks, createRisk, updateRisk, deleteRisk, fetchUsers } from "@/lib/api";
import { Risk } from "@/types/risk";
import { User } from "@/types/user";

import {
  Cpu, Landmark, Gavel, Users, ClipboardList, Shield, Building,
  BarChart, AreaChart, DollarSign, Briefcase, FileText, Scale,
  Handshake, Search, Lightbulb, UserCheck, FolderGit2, Coins
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';


// ---------------- Schema Form ----------------
const riskSchema = z.object({
  nama_risk: z.string().min(3, "Nama risk wajib diisi"),
  deskripsi: z.string().min(5, "Deskripsi wajib diisi"),
  kategori: z.string().min(1, "Kategori wajib dipilih"),
  likelihood: z.string().min(1, "Likelihood wajib diisi"),
  impact: z.string().min(1, "Impact wajib diisi"),
  pemilik: z.string().min(1, "Pemilik wajib dipilih"),
});

// ---------------- Division Data ----------------
interface Division {
  title: string;
  description: string;
  total: number;
  icon: LucideIcon;
}

const divisionData: Division[] = [
  { title: 'Direktorat Teknologi Informasi', description: 'Menyediakan solusi teknologi informasi', total: 12, icon: Cpu },
  { title: 'Direktorat Keuangan', description: 'Mengelola keuangan perusahaan', total: 8, icon: DollarSign },
  { title: 'Direktorat SDM & Umum', description: 'Mengatur sumber daya manusia dan umum', total: 15, icon: Users },
  { title: 'Direktorat Kepatuhan', description: 'Mengawasi kepatuhan dan tata kelola', total: 5, icon: Shield },
  { title: 'Direktorat Hukum', description: 'Menyediakan layanan hukum', total: 7, icon: Gavel },
  { title: 'Direktorat Audit', description: 'Melakukan audit internal', total: 4, icon: ClipboardList },
];

// ---------------- Main Component ----------------
export default function RiskRegisterPage() {
  const router = useRouter();
  const [risks, setRisks] = useState<Risk[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);

  const [editingRisk, setEditingRisk] = useState<Risk | null>(null);
  const [viewingRisk, setViewingRisk] = useState<Risk | null>(null);

  // Fetch data risks + users
  useEffect(() => {
    fetchRisks().then(setRisks);
    fetchUsers().then(setUsers);
  }, []);

  // Hitung total risiko per divisi (dummy match)
  const divisionTotals = divisionData.map(div => ({
    ...div,
    total: risks.filter(r => r.kategori === div.title).length || div.total
  }));

  // ---------------- Form ----------------
  const form = useForm<z.infer<typeof riskSchema>>({
    resolver: zodResolver(riskSchema),
    defaultValues: {
      nama_risk: "",
      deskripsi: "",
      kategori: "",
      likelihood: "",
      impact: "",
      pemilik: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof riskSchema>) => {
    try {
      if (editingRisk) {
        const updated = await updateRisk(editingRisk.id, data);
        setRisks(risks.map(r => (r.id === updated.id ? updated : r)));
        toast({ title: "Risk updated successfully" });
      } else {
        const created = await createRisk(data);
        setRisks([...risks, created]);
        toast({ title: "Risk created successfully" });
      }
      setEditingRisk(null);
      form.reset();
    } catch {
      toast({ title: "Error saving risk", variant: "destructive" });
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="p-6">
      <PageHeader title="Risk Register" description="Kelola risiko perusahaan berdasarkan divisi" />

      {!selectedDivision ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Kantor Pusat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {divisionTotals.map((division, idx) => (
              <Card
                key={idx}
                className="cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedDivision(division.title)}
              >
                <CardHeader className="flex flex-row items-center gap-3">
                  <division.icon className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle className="text-base">{division.title}</CardTitle>
                    <CardDescription>{division.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Total Risks: <span className="font-semibold">{division.total}</span></p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{selectedDivision}</h2>
            <Button onClick={() => setSelectedDivision(null)}>← Back</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Risk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Likelihood</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Pemilik</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks
                .filter(r => r.kategori === selectedDivision)
                .map(risk => (
                  <TableRow key={risk.id}>
                    <TableCell>{risk.nama_risk}</TableCell>
                    <TableCell>{risk.kategori}</TableCell>
                    <TableCell>{risk.likelihood}</TableCell>
                    <TableCell>{risk.impact}</TableCell>
                    <TableCell>{users.find(u => u.id === risk.pemilik)?.name || risk.pemilik}</TableCell>
                    <TableCell className="space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setViewingRisk(risk)}>View</Button>
                      <Button size="sm" onClick={() => setEditingRisk(risk)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={async () => {
                        await deleteRisk(risk.id);
                        setRisks(risks.filter(r => r.id !== risk.id));
                        toast({ title: "Risk deleted" });
                      }}>Delete</Button>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      {/* View Details Dialog */}
      <Dialog open={!!viewingRisk} onOpenChange={(o) => !o && setViewingRisk(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Risk Details</DialogTitle>
            <DialogDescription>Detail risiko ID: {viewingRisk?.id}</DialogDescription>
          </DialogHeader>
          {viewingRisk && (
            <div className="text-sm max-h-[70vh] overflow-y-auto pr-4">
              <dl className="divide-y">
                {Object.entries(viewingRisk).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 gap-4 py-2">
                    <dt className="font-semibold text-muted-foreground">{key}</dt>
                    <dd className="col-span-2 whitespace-pre-wrap leading-relaxed">
                      {typeof value === "boolean" ? (value ? "Yes" : "No") : String(value)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingRisk(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
