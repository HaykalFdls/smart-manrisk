
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
import { Bot, Save, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

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

const getLevelFromBesaran = (besaran: number | null) => {
  if (besaran === null) return { label: '-', className: '' };
  if (besaran >= 20) return { label: 'Sangat Tinggi', className: 'bg-red-700 text-white' };
  if (besaran >= 12) return { label: 'Tinggi', className: 'bg-red-500 text-white' };
  if (besaran >= 5) return { label: 'Menengah', className: 'bg-yellow-400 text-black' };
  return { label: 'Rendah', className: 'bg-green-500 text-white' };
};

export default function Rcsapage() {
  const { toast } = useToast();
  const [data, setData] = useState<RCSAData[]>(getRcsaData());
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingRow, setGeneratingRow] = useState<number | null>(null);

  const handleInputChange = (
    index: number,
    field: keyof RCSAData,
    value: string | number | null
  ) => {
    const newData = [...data];
    const updatedRow = { ...newData[index] };

    // @ts-ignore
    updatedRow[field] = value;

    // Recalculate besaran and level if dampak or frekuensi changes
    if (field === 'dampakInheren' || field === 'frekuensiInheren') {
        const dampak = field === 'dampakInheren' ? (value as number) : updatedRow.dampakInheren;
        const frekuensi = field === 'frekuensiInheren' ? (value as number) : updatedRow.frekuensiInheren;

        if (dampak !== null && frekuensi !== null && dampak > 0 && frekuensi > 0) {
            const besaran = dampak * frekuensi;
            updatedRow.besaranInheren = besaran;
            updatedRow.levelInheren = getLevelFromBesaran(besaran).label;
        } else {
            updatedRow.besaranInheren = null;
            updatedRow.levelInheren = null;
        }
    }
    
    newData[index] = updatedRow;
    setData(newData);
  };

  const handleSave = () => {
    setIsSaving(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      updateRcsaData(data);
      toast({
        title: 'Sukses!',
        description: 'Data RCSA berhasil disimpan.',
      });
      setIsSaving(false);
    }, 1000);
  };

  const handleAiGenerate = (index: number) => {
    setGeneratingRow(index);
    setIsGenerating(true);
    // Mock AI generation
    setTimeout(() => {
      const newData = [...data];
      const currentRisk = newData[index];
      
      const dampak = 4;
      const frekuensi = 2;
      const besaran = dampak * frekuensi;

      newData[index] = {
        ...currentRisk,
        jenisRisiko: 'Risiko Operasional',
        penyebabRisiko: 'Human error teridentifikasi (AI)',
        dampakInheren: dampak,
        frekuensiInheren: frekuensi,
        besaranInheren: besaran,
        levelInheren: getLevelFromBesaran(besaran).label,
        pengendalian: 'Verifikasi Ganda (AI)',
        dampakResidual: 2,
        kemungkinanResidual: 1,
        penilaianKontrol: 'Cukup Efektif',
        actionPlan: 'Otomatisasi proses verifikasi (AI)',
        pic: 'AI Assistant',
      };
      setData(newData);
      setIsGenerating(false);
      setGeneratingRow(null);
      toast({
        title: 'AI Berhasil!',
        description: `Data untuk risiko "${currentRisk.potensiRisiko}" berhasil dilengkapi.`,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Risk Control Self-Assessment (RCSA)
          </h1>
          <p className="text-muted-foreground">
            Lengkapi dan kelola data RCSA untuk unit operasional.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} disabled={isSaving || isGenerating}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-max">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px] text-center">No.</TableHead>
                  <TableHead className="min-w-[250px]">
                    Potensi Risiko
                  </TableHead>
                  <TableHead className="min-w-[200px]">Jenis Risiko</TableHead>
                  <TableHead className="min-w-[200px]">
                    Penyebab Risiko
                  </TableHead>
                  <TableHead className="w-[80px] text-center">Dampak Inheren</TableHead>
                  <TableHead className="w-[80px] text-center">Frekuensi Inheren</TableHead>
                  <TableHead className="w-[80px] text-center">Besaran Inheren</TableHead>
                  <TableHead className="w-[120px] text-center">Level Inheren</TableHead>
                  <TableHead className="min-w-[200px]">Pengendalian</TableHead>
                  <TableHead className="w-[80px]">Dampak Residual</TableHead>
                  <TableHead className="w-[80px]">
                    Kemungkinan Residual
                  </TableHead>
                  <TableHead className="w-[150px]">
                    Penilaian Kontrol
                  </TableHead>
                  <TableHead className="min-w-[200px]">Action Plan</TableHead>
                  <TableHead className="w-[150px]">PIC</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={row.no}>
                    <TableCell className="text-center">{row.no}</TableCell>
                    <TableCell>
                      <Textarea
                        value={row.potensiRisiko}
                        onChange={(e) =>
                          handleInputChange(index, 'potensiRisiko', e.target.value)
                        }
                        className="min-h-[60px]"
                      />
                    </TableCell>
                    <TableCell>
                       <Select
                        value={row.jenisRisiko || ''}
                        onValueChange={(value) =>
                          handleInputChange(index, 'jenisRisiko', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis risiko..." />
                        </SelectTrigger>
                        <SelectContent>
                          {jenisRisikoOptions.map(option => (
                             <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.penyebabRisiko || ''}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'penyebabRisiko',
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={row.dampakInheren || ''}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'dampakInheren',
                            parseInt(e.target.value) || null
                          )
                        }
                        className="text-center"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={row.frekuensiInheren || ''}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'frekuensiInheren',
                            parseInt(e.target.value) || null
                          )
                        }
                        className="text-center"
                      />
                    </TableCell>
                    <TableCell className="text-center font-bold">
                        {row.besaranInheren || '-'}
                    </TableCell>
                    <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelFromBesaran(row.besaranInheren).className}`}>
                           {getLevelFromBesaran(row.besaranInheren).label}
                        </span>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.pengendalian || ''}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'pengendalian',
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.dampakResidual || ''}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'dampakResidual',
                            parseInt(e.target.value) || null
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.kemungkinanResidual || ''}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'kemungkinanResidual',
                            parseInt(e.target.value) || null
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={row.penilaianKontrol || ''}
                        onValueChange={(value) =>
                          handleInputChange(index, 'penilaianKontrol', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Efektif">Efektif</SelectItem>
                          <SelectItem value="Cukup Efektif">
                            Cukup Efektif
                          </SelectItem>
                          <SelectItem value="Tidak Efektif">
                            Tidak Efektif
                          </SelectItem>
                          <SelectItem value="#N/A">N/A</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.actionPlan || ''}
                        onChange={(e) =>
                          handleInputChange(index, 'actionPlan', e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.pic || ''}
                        onChange={(e) =>
                          handleInputChange(index, 'pic', e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAiGenerate(index)}
                        disabled={isGenerating}
                        title="Lengkapi dengan AI"
                      >
                        {isGenerating && generatingRow === index ? (
                          <Bot className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
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
