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
    // @ts-ignore
    newData[index][field] = value;
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
      newData[index] = {
        ...currentRisk,
        jenisRisiko: 'Operasional (AI)',
        penyebabRisiko: 'Human error teridentifikasi (AI)',
        dampakInheren: 4,
        frekuensiInheren: 2,
        pengendalian: 'Verifikasi Ganda (AI)',
        dampakResidual: 2,
        kemungkinanResidual: 1,
        penilaianKontrol: 'Cukup Efektif (AI)',
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
                  <TableHead className="w-[40px]">No.</TableHead>
                  <TableHead className="min-w-[250px]">
                    Potensi Risiko
                  </TableHead>
                  <TableHead className="w-[150px]">Jenis Risiko</TableHead>
                  <TableHead className="min-w-[200px]">
                    Penyebab Risiko
                  </TableHead>
                  <TableHead className="w-[80px]">Dampak Inheren</TableHead>
                  <TableHead className="w-[80px]">Frekuensi Inheren</TableHead>
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
                      <Input
                        value={row.potensiRisiko}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'potensiRisiko',
                            e.target.value
                          )
                        }
                        className="border-none"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.jenisRisiko || ''}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'jenisRisiko',
                            e.target.value
                          )
                        }
                      />
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
                        value={row.dampakInheren || ''}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'dampakInheren',
                            parseInt(e.target.value) || null
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.frekuensiInheren || ''}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'frekuensiInheren',
                            parseInt(e.target.value) || null
                          )
                        }
                      />
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
