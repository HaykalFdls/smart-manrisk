
'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, FilePlus, CheckCircle2, XCircle, MoreHorizontal } from 'lucide-react';
import { useParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { RiskDetailsModal } from '@/components/risk/risk-details-modal';
import { AddRiskForm } from '@/components/risk/add-risk-form';


export type RiskData = {
  id: string;
  kategori: string;
  riskEvent: string;
  risikoResidual: 'Rendah' | 'Menengah' | 'Tinggi' | 'Kritis';
  riskOwner: string;
  treatmentPlan: string;
  isFraud: boolean;
};

const mockRiskData: { [key: string]: RiskData[] } = {
    'Divisi Audit Internal': [
        { id: 'AI-001', kategori: 'Internal Control', riskEvent: 'Temuan audit berulang tidak ditindaklanjuti', risikoResidual: 'Tinggi', riskOwner: 'Kantor Pusat - Divisi Audit Internal', treatmentPlan: 'Mitigate', isFraud: false },
        { id: 'AI-002', kategori: 'Operational', riskEvent: 'Keterbatasan sumber daya untuk audit menyeluruh', risikoResidual: 'Menengah', riskOwner: 'Kantor Pusat - Divisi Audit Internal', treatmentPlan: 'Accept', isFraud: false },
    ],
    'Divisi Sumber Daya Insani (SDI)': [
        { id: 'HR-001', kategori: 'Talenta', riskEvent: 'Tingkat turnover karyawan tinggi', risikoResidual: 'Menengah', riskOwner: 'Kantor Pusat - Divisi SDI', treatmentPlan: 'Mitigate', isFraud: false },
    ],
    'Divisi Perencanaan Strategis': [
         { id: 'PS-001', kategori: 'Strategic', riskEvent: 'Strategi bisnis tidak sejalan dengan perkembangan pasar', risikoResidual: 'Tinggi', riskOwner: 'Kantor Pusat - Divisi Perencanaan Strategis', treatmentPlan: 'Mitigate', isFraud: true },
    ],
    'Divisi Penyelamatan & Penyelesaian Pembiayaan (P3)': [
        { id: 'P3-001', kategori: 'Credit', riskEvent: 'Proses restrukturisasi pembiayaan macet tidak efektif', risikoResidual: 'Kritis', riskOwner: 'Kantor Pusat - Divisi P3', treatmentPlan: 'Mitigate', isFraud: false },
    ],
    'Divisi Pembiayaan Konsumer': [
        { id: 'CON-001', kategori: 'Credit', riskEvent: 'Peningkatan NPL pada produk KPR', risikoResidual: 'Tinggi', riskOwner: 'Kantor Pusat - Divisi Pembiayaan Konsumer', treatmentPlan: 'Transfer', isFraud: false },
    ],
    'Divisi Dana Jasa Ritel': [],
    'Divisi Dana Korporasi dan Institusi (Insbank)': [],
    'Divisi Kepatuhan': [
      { id: 'COM-001', kategori: 'Regulasi', riskEvent: 'Keterlambatan pelaporan ke regulator', risikoResidual: 'Rendah', riskOwner: 'Kantor Pusat - Divisi Kepatuhan', treatmentPlan: 'Accept', isFraud: false },
    ],
    'Divisi Teknologi Informasi': [
        { id: 'IT-001', kategori: 'Pengelolaan sistem bank', riskEvent: 'Serangan siber pada sistem bank', risikoResidual: 'Rendah', riskOwner: 'Kantor Pusat - Divisi Teknologi Informasi', treatmentPlan: 'Mitigate', isFraud: true },
        { id: 'IT-002', kategori: 'Pemeliharaan perangkat keras', riskEvent: 'Kegagalan server yang menyebabkan downtime', risikoResidual: 'Menengah', riskOwner: 'Kantor Pusat - Divisi Teknologi Informasi', treatmentPlan: 'Mitigate', isFraud: false },
        { id: 'IT-003', kategori: 'Operasional TI', riskEvent: 'Data backup tidak lengkap', risikoResidual: 'Menengah', riskOwner: 'Kantor Pusat - Divisi Teknologi Informasi', treatmentPlan: 'Mitigate', isFraud: false },
    ],
    'Divisi Operasional': [
        { id: 'OPS-001', kategori: 'Proses Internal', riskEvent: 'Gangguan pada sistem antrian teller', risikoResidual: 'Menengah', riskOwner: 'Kantor Cabang A - Divisi Operasional', treatmentPlan: 'Mitigate', isFraud: false },
        { id: 'OPS-002', kategori: 'Eksternal', riskEvent: 'Pemadaman listrik di kantor cabang utama', risikoResidual: 'Tinggi', riskOwner: 'Kantor Cabang Utama - Divisi Operasional', treatmentPlan: 'Avoid', isFraud: false },
    ],
    'Divisi Pengendalian Keuangan': [
        { id: 'FIN-001', kategori: 'Pelaporan', riskEvent: 'Kesalahan perhitungan laporan kuartalan', risikoResidual: 'Menengah', riskOwner: 'Kantor Pusat - Divisi Pengendalian Keuangan', treatmentPlan: 'Mitigate', isFraud: false },
        { id: 'FIN-002', kategori: 'Kredit', riskEvent: 'Peningkatan kredit macet di sektor retail', risikoResidual: 'Tinggi', riskOwner: 'Kantor Pusat - Divisi Pengendalian Keuangan', treatmentPlan: 'Mitigate', isFraud: true },
    ],
    'Divisi Risiko Pembiayaan': [],
    'Divisi Pembiayaan UMKM, Ritel, & Komersil': [],
    'Divisi Manajemen Risiko': [],
    'Divisi Bisnis Digital': [
        { id: 'DIG-001', kategori: 'Project', riskEvent: 'Kegagalan implementasi platform digital banking baru', risikoResidual: 'Tinggi', riskOwner: 'Kantor Pusat - Divisi Bisnis Digital', treatmentPlan: 'Mitigate', isFraud: false },
    ],
    'Desk Sekretariat Perusahaan (Corsec)': [],
    'Desk Pengembangan Produk & Prosedur (Sysdur)': [],
    'Desk Administrasi Pembiayaan & Bisnis Legal (APBL)': [],
    'Desk Legal': [],
    'Desk Treasury': [],
};

const getLevelBadgeVariant = (level: RiskData['risikoResidual']) => {
  switch (level) {
    case 'Kritis':
      return 'destructive';
    case 'Tinggi':
      return 'destructive';
    case 'Menengah':
      return 'secondary';
    case 'Rendah':
    default:
      return 'outline';
  }
};

export default function RiskDetailPage() {
  const params = useParams();
  const { toast } = useToast();
  const division = decodeURIComponent(params.division as string);
  const [risks, setRisks] = useState(mockRiskData[division] || []);
  const pageTitle = division.replace(/Divisi|Desk/g, '').trim();

  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<RiskData | null>(null);
  const [editingRisk, setEditingRisk] = useState<RiskData | null>(null);

  const handleViewDetails = (risk: RiskData) => {
    setSelectedRisk(risk);
    setDetailsModalOpen(true);
  };

  const handleAddNewRisk = () => {
    setEditingRisk(null);
    setFormModalOpen(true);
  };

  const handleEdit = (risk: RiskData) => {
    setEditingRisk(risk);
    setFormModalOpen(true);
  };

  const handleDelete = (risk: RiskData) => {
    setSelectedRisk(risk);
    setDeleteAlertOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedRisk) return;
    setRisks(risks.filter(r => r.id !== selectedRisk.id));
    setDeleteAlertOpen(false);
    setSelectedRisk(null);
    toast({
        title: 'Sukses!',
        description: 'Data risiko berhasil dihapus.',
    });
  };

  const handleFormSuccess = (data: RiskData) => {
    if (editingRisk) {
      // Update existing risk
      setRisks(risks.map(r => r.id === data.id ? data : r));
    } else {
      // Add new risk
      setRisks([...risks, data]);
    }
    setFormModalOpen(false);
    setEditingRisk(null);
  };

  return (
    <>
      <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8 bg-gray-50/50">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
            <p className="text-muted-foreground">A list of risks for the {division} division.</p>
          </div>
          <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                  <Link href="/risk-register">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                  </Link>
              </Button>
              <Button onClick={handleAddNewRisk}>
                  <FilePlus className="mr-2 h-4 w-4" />
                  Add New Risk
              </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">No.</TableHead>
                  <TableHead>Kategori Risiko/Proses</TableHead>
                  <TableHead>Risk Event/Potensi Risiko</TableHead>
                  <TableHead>Risiko Residual</TableHead>
                  <TableHead>Risk Owner</TableHead>
                  <TableHead>Risk Treatment Plan</TableHead>
                  <TableHead>Fraud</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {risks.length > 0 ? (
                  risks.map((risk, index) => (
                    <TableRow key={risk.id}>
                      <TableCell className="font-medium text-center">{index + 1}</TableCell>
                      <TableCell>{risk.kategori}</TableCell>
                      <TableCell>{risk.riskEvent}</TableCell>
                      <TableCell>
                        <Badge variant={getLevelBadgeVariant(risk.risikoResidual)}>{risk.risikoResidual}</Badge>
                      </TableCell>
                      <TableCell>{risk.riskOwner}</TableCell>
                      <TableCell>{risk.treatmentPlan}</TableCell>
                      <TableCell>
                        {risk.isFraud ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell>
                         <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(risk)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewDetails(risk)}>
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(risk)}>
                                Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center h-24">
                      Tidak ada data risiko untuk divisi ini.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <RiskDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        risk={selectedRisk}
      />
      <Dialog open={isFormModalOpen} onOpenChange={setFormModalOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingRisk ? 'Edit Risk' : 'Add New Risk'}</DialogTitle>
            <DialogDescription>
             {editingRisk ? `Editing risk data for ${editingRisk.id}` : `Fill out the form below to add a new risk to the ${pageTitle} division.`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <AddRiskForm
              division={pageTitle}
              existingData={editingRisk}
              onSuccess={handleFormSuccess}
            />
          </div>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the risk
              record for "{selectedRisk?.riskEvent}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

    