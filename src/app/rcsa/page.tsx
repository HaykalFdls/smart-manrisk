
'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { getRcsaData, updateRcsaData, type RCSAData } from '@/lib/rcsa-data';
import { useToast } from '@/hooks/use-toast';
import { Save, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const jenisRisikoOptions = [
  'Risiko Kredit',
  'Risiko Pasar',
  'Risiko Likuiditas',
  'Risiko Operasional',
  'Risiko Hukum',
  'Risiko Reputasi',
  'Risiko Strategis',
  'Risiko Kepatuhan',
  'Risiko Imbal Hasil',
  'Risiko Investasi',
];

const getLevelFromBesaran = (besaran: number | null | undefined) => {
  if (besaran === null || besaran === undefined) return { label: '-', className: '' };
  if (besaran >= 20) return { label: 'Sangat Tinggi', className: 'bg-red-700 text-white' };
  if (besaran >= 12) return { label: 'Tinggi', className: 'bg-red-500 text-white' };
  if (besaran >= 5) return { label: 'Menengah', className: 'bg-yellow-400 text-black' };
  return { label: 'Rendah', className: 'bg-green-500 text-white' };
};


export default function Rcsapage() {
  const { toast } = useToast();
  const [data, setData] = useState<RCSAData[]>(getRcsaData());
  const [isSaving, setIsSaving] = useState(false);

  const calculatedData = useMemo(() => {
    return data.map(row => {
      const dampakInheren = row.dampakInheren;
      const frekuensiInheren = row.frekuensiInheren;
      const besaranInheren = (dampakInheren !== null && frekuensiInheren !== null && dampakInheren > 0 && frekuensiInheren > 0)
        ? dampakInheren * frekuensiInheren
        : null;
      const levelInheren = getLevelFromBesaran(besaranInheren).label;

      const dampakResidual = row.dampakResidual;
      const kemungkinanResidual = row.kemungkinanResidual;
      const besaranResidual = (dampakResidual !== null && kemungkinanResidual !== null && dampakResidual > 0 && kemungkinanResidual > 0)
        ? dampakResidual * kemungkinanResidual
        : null;
      const levelResidual = getLevelFromBesaran(besaranResidual).label;
      
      return {
        ...row,
        besaranInheren,
        levelInheren,
        besaranResidual,
        levelResidual
      };
    })
  }, [data]);

  const handleInputChange = (
    index: number,
    field: keyof RCSAData,
    value: string | number | null
  ) => {
    const newData = [...data];
    const updatedRow = { ...newData[index] };
    // @ts-ignore
    updatedRow[field] = value;
    newData[index] = updatedRow;
    setData(newData);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateRcsaData(data);
      toast({
        title: 'Sukses!',
        description: 'Data RCSA berhasil disimpan sebagai draf.',
      });
      setIsSaving(false);
    }, 1000);
  };
  
  const handleSubmit = () => {
     // Here you would typically send the data to the server
     // For now, we just show a toast
     toast({
        title: 'Data Terkirim!',
        description: 'Data RCSA Anda telah berhasil dikirim untuk ditinjau oleh admin.',
        variant: 'default',
     });
  };

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Risk Control Self-Assessment (RCSA)
          </h1>
          <p className="text-muted-foreground">
            Lengkapi dan kelola data RCSA untuk unit operasional Anda.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Menyimpan...' : 'Simpan Draf'}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Kirim ke Admin
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi Pengiriman</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah Anda yakin ingin mengirim data RCSA ini? Setelah dikirim, data tidak dapat diubah kembali hingga ditinjau oleh admin.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit}>Ya, Kirim Data</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-max whitespace-nowrap">
               <TableHeader>
                <TableRow>
                  <TableHead rowSpan={2} className="w-[40px] text-center sticky left-0 bg-card z-10 border-r">No.</TableHead>
                  <TableHead rowSpan={2} className="min-w-[200px] sticky left-12 bg-card z-10 border-r">Unit Kerja</TableHead>
                  <TableHead rowSpan={2} className="min-w-[300px] sticky left-64 bg-card z-10 border-r">Potensi Risiko</TableHead>
                  <TableHead rowSpan={2} className="min-w-[200px] border-r">Jenis Risiko</TableHead>
                  <TableHead rowSpan={2} className="min-w-[250px] border-r">Penyebab Risiko</TableHead>
                  
                  <TableHead colSpan={4} className="text-center border-x">RISIKO INHEREN</TableHead>
                  
                  <TableHead rowSpan={2} className="min-w-[250px] border-r">Pengendalian/Mitigasi Risiko</TableHead>
                  
                  <TableHead colSpan={4} className="text-center border-x">RISIKO RESIDUAL</TableHead>
                  
                  <TableHead rowSpan={2} className="min-w-[180px] border-r">Penilaian Tingkat Efektivitas Kontrol</TableHead>
                  <TableHead rowSpan={2} className="min-w-[250px] border-r">Action Plan/Mitigasi</TableHead>
                  <TableHead rowSpan={2} className="min-w-[150px] border-r">PIC</TableHead>
                  <TableHead rowSpan={2} className="min-w-[250px]">Keterangan</TableHead>
                </TableRow>
                <TableRow>
                  {/* RISIKO INHEREN */}
                  <TableHead className="w-[80px] text-center border-x">Dampak</TableHead>
                  <TableHead className="w-[80px] text-center">Frekuensi</TableHead>
                  <TableHead className="w-[80px] text-center border-x">Besaran</TableHead>
                  <TableHead className="w-[120px] text-center">Level</TableHead>
                  {/* RISIKO RESIDUAL */}
                  <TableHead className="w-[80px] text-center border-x">Dampak</TableHead>
                  <TableHead className="w-[110px] text-center">Kemungkinan</TableHead>
                  <TableHead className="w-[80px] text-center border-x">Besaran</TableHead>
                  <TableHead className="w-[120px] text-center">Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calculatedData.map((row, index) => (
                  <TableRow key={row.no}>
                    <TableCell className="text-center sticky left-0 bg-card z-10 border-r">{row.no}</TableCell>
                    <TableCell className="font-medium bg-muted/30 sticky left-12 bg-card z-10 border-r">{row.unitKerja}</TableCell>
                    <TableCell className="font-medium bg-muted/30 sticky left-64 bg-card z-10 border-r whitespace-normal">{row.potensiRisiko}</TableCell>
                    
                    <TableCell>
                       <Select
                        value={row.jenisRisiko || ''}
                        onValueChange={(value) => handleInputChange(index, 'jenisRisiko', value)}
                      >
                        <SelectTrigger><SelectValue placeholder="Pilih..." /></SelectTrigger>
                        <SelectContent>
                          {jenisRisikoOptions.map(option => (
                             <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                       <Textarea
                        value={row.penyebabRisiko || ''}
                        onChange={(e) => handleInputChange(index, 'penyebabRisiko', e.target.value)}
                        className="min-h-[50px]"
                      />
                    </TableCell>

                    {/* INHEREN */}
                    <TableCell>
                      <Input type="number" min="1" max="5" value={row.dampakInheren || ''} onChange={(e) => handleInputChange(index, 'dampakInheren', parseInt(e.target.value) || null)} className="text-center" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" min="1" max="5" value={row.frekuensiInheren || ''} onChange={(e) => handleInputChange(index, 'frekuensiInheren', parseInt(e.target.value) || null)} className="text-center" />
                    </TableCell>
                    <TableCell className="text-center font-bold">{row.besaranInheren || '-'}</TableCell>
                    <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelFromBesaran(row.besaranInheren).className}`}>
                           {row.levelInheren || '-'}
                        </span>
                    </TableCell>

                    <TableCell>
                       <Textarea
                        value={row.pengendalian || ''}
                        onChange={(e) => handleInputChange(index, 'pengendalian', e.target.value)}
                         className="min-h-[50px]"
                      />
                    </TableCell>
                    
                    {/* RESIDUAL */}
                    <TableCell>
                       <Input type="number" min="1" max="5" value={row.dampakResidual || ''} onChange={(e) => handleInputChange(index, 'dampakResidual', parseInt(e.target.value) || null)} className="text-center" />
                    </TableCell>
                    <TableCell>
                       <Input type="number" min="1" max="5" value={row.kemungkinanResidual || ''} onChange={(e) => handleInputChange(index, 'kemungkinanResidual', parseInt(e.target.value) || null)} className="text-center" />
                    </TableCell>
                     <TableCell className="text-center font-bold">{row.besaranResidual || '-'}</TableCell>
                    <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelFromBesaran(row.besaranResidual).className}`}>
                           {row.levelResidual || '-'}
                        </span>
                    </TableCell>

                    <TableCell>
                      <Select
                        value={row.penilaianKontrol || ''}
                        onValueChange={(value) => handleInputChange(index, 'penilaianKontrol', value)}
                      >
                        <SelectTrigger><SelectValue placeholder="Pilih..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Efektif">Efektif</SelectItem>
                          <SelectItem value="Cukup Efektif">Cukup Efektif</SelectItem>
                          <SelectItem value="Tidak Efektif">Tidak Efektif</SelectItem>
                          <SelectItem value="#N/A">N/A</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                       <Textarea
                        value={row.actionPlan || ''}
                        onChange={(e) => handleInputChange(index, 'actionPlan', e.target.value)}
                         className="min-h-[50px]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input value={row.pic || ''} onChange={(e) => handleInputChange(index, 'pic', e.target.value)} />
                    </TableCell>
                    <TableCell className="font-medium bg-muted/30 whitespace-normal">{row.keterangan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
