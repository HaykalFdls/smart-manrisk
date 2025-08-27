
'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { getAllRcsaSubmissions, type RCSASubmission } from '@/lib/rcsa-data';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const getLevelFromBesaran = (besaran: number | null | undefined) => {
  if (besaran === null || besaran === undefined) return { label: '-', className: '' };
  if (besaran >= 20) return { label: 'Sangat Tinggi', className: 'bg-red-700 text-white' };
  if (besaran >= 12) return { label: 'Tinggi', className: 'bg-red-500 text-white' };
  if (besaran >= 5) return { label: 'Menengah', className: 'bg-yellow-400 text-black' };
  return { label: 'Rendah', className: 'bg-green-500 text-white' };
};

export default function RcsaReportPage() {
  const [submissions, setSubmissions] = useState<RCSASubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = () => {
    setIsLoading(true);
    setSubmissions(getAllRcsaSubmissions().sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()));
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return <div className="p-8">Memuat data...</div>;
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Laporan RCSA Terkirim
          </h1>
          <p className="text-muted-foreground">
            Tinjau semua data RCSA yang telah dikirim oleh unit operasional.
          </p>
        </div>
        <Button onClick={loadData} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Muat Ulang Data
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          {submissions.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              Belum ada laporan RCSA yang dikirim.
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {submissions.map((submission, index) => (
                <AccordionItem value={`item-${index}`} key={submission.id}>
                  <AccordionTrigger>
                    <div className="flex justify-between w-full pr-4">
                        <span>Laporan #{submission.id}</span>
                        <span className="text-sm text-muted-foreground">
                            Dikirim pada: {new Date(submission.submittedAt).toLocaleString('id-ID')}
                        </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="overflow-x-auto">
                      <Table className="min-w-max whitespace-nowrap">
                         <TableHeader>
                            <TableRow>
                            <TableHead rowSpan={2} className="w-[40px] text-center sticky left-0 bg-card z-10 border-r">No.</TableHead>
                            <TableHead rowSpan={2} className="min-w-[200px] sticky left-12 bg-card z-10 border-r">Unit Kerja</TableHead>
                            <TableHead rowSpan={2} className="min-w-[300px] sticky left-64 bg-card z-10 border-r">Potensi Risiko</TableHead>
                            <TableHead rowSpan={2} className="min-w-[200px] border-r">Jenis Risiko</TableHead>
                            <TableHead rowSpan={2} className="min-w-[250px] border-r">Penyebab Risiko</TableHead>
                            
                            <TableHead colSpan={4} className="text-center border-x bg-blue-50">RISIKO INHEREN</TableHead>
                            
                            <TableHead rowSpan={2} className="min-w-[250px] border-r">Pengendalian/Mitigasi Risiko</TableHead>
                            
                            <TableHead colSpan={4} className="text-center border-x bg-green-50">RISIKO RESIDUAL</TableHead>
                            
                            <TableHead rowSpan={2} className="min-w-[180px] border-r">Penilaian Tingkat Efektivitas Kontrol</TableHead>
                            <TableHead rowSpan={2} className="min-w-[250px] border-r">Action Plan/Mitigasi</TableHead>
                            <TableHead rowSpan={2} className="min-w-[150px] border-r">PIC</TableHead>
                            <TableHead rowSpan={2} className="min-w-[250px]">Keterangan</TableHead>
                            </TableRow>
                            <TableRow>
                            {/* RISIKO INHEREN */}
                            <TableHead className="w-[80px] text-center border-x bg-blue-50">Dampak</TableHead>
                            <TableHead className="w-[80px] text-center bg-blue-50">Frekuensi</TableHead>
                            <TableHead className="w-[80px] text-center border-x bg-blue-50">Besaran</TableHead>
                            <TableHead className="w-[120px] text-center bg-blue-50">Level</TableHead>
                            {/* RISIKO RESIDUAL */}
                            <TableHead className="w-[80px] text-center border-x bg-green-50">Dampak</TableHead>
                            <TableHead className="w-[110px] text-center bg-green-50">Kemungkinan</TableHead>
                            <TableHead className="w-[80px] text-center border-x bg-green-50">Besaran</TableHead>
                            <TableHead className="w-[120px] text-center bg-green-50">Level</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                          {submission.data.map((row) => {
                             const besaranInheren = (row.dampakInheren && row.frekuensiInheren) ? row.dampakInheren * row.frekuensiInheren : null;
                             const levelInheren = getLevelFromBesaran(besaranInheren).label;
                             const besaranResidual = (row.dampakResidual && row.kemungkinanResidual) ? row.dampakResidual * row.kemungkinanResidual : null;
                             const levelResidual = getLevelFromBesaran(besaranResidual).label;
                             return (
                                <TableRow key={row.no}>
                                    <TableCell className="text-center sticky left-0 bg-card z-10 border-r">{row.no}</TableCell>
                                    <TableCell className="font-medium sticky left-12 bg-card z-10 border-r">{row.unitKerja}</TableCell>
                                    <TableCell className="sticky left-64 bg-card z-10 border-r whitespace-normal">{row.potensiRisiko}</TableCell>
                                    <TableCell>{row.jenisRisiko || '-'}</TableCell>
                                    <TableCell className="whitespace-normal">{row.penyebabRisiko || '-'}</TableCell>
                                    <TableCell className="text-center">{row.dampakInheren || '-'}</TableCell>
                                    <TableCell className="text-center">{row.frekuensiInheren || '-'}</TableCell>
                                    <TableCell className="text-center font-bold">{besaranInheren || '-'}</TableCell>
                                    <TableCell className="text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelFromBesaran(besaranInheren).className}`}>
                                        {levelInheren || '-'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="whitespace-normal">{row.pengendalian || '-'}</TableCell>
                                    <TableCell className="text-center">{row.dampakResidual || '-'}</TableCell>
                                    <TableCell className="text-center">{row.kemungkinanResidual || '-'}</TableCell>
                                    <TableCell className="text-center font-bold">{besaranResidual || '-'}</TableCell>
                                    <TableCell className="text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelFromBesaran(besaranResidual).className}`}>
                                        {levelResidual || '-'}
                                        </span>
                                    </TableCell>
                                    <TableCell>{row.penilaianKontrol || '-'}</TableCell>
                                    <TableCell className="whitespace-normal">{row.actionPlan || '-'}</TableCell>
                                    <TableCell>{row.pic || '-'}</TableCell>
                                    <TableCell className="whitespace-normal">{row.keterangan || '-'}</TableCell>
                                </TableRow>
                             );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
