
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '../ui/scroll-area';

const formSchema = z.object({
  kategori: z.string().min(1, 'Kategori risiko harus diisi.'),
  riskEvent: z.string().min(1, 'Risk event/temuan harus diisi.'),
  rootCause: z.string().min(1, 'Root cause harus diisi.'),
  dampak: z.string().min(1, 'Dampak harus diisi.'),
  
  dampakKeuangan: z.coerce.number().min(1).max(5),
  tingkatDampakKeuangan: z.enum(['Rendah', 'Menengah', 'Tinggi', 'Kritis']),
  dampakOperasional: z.coerce.number().min(1).max(5),
  tingkatDampakOperasional: z.enum(['Rendah', 'Menengah', 'Tinggi', 'Kritis']),
  dampakReputasi: z.coerce.number().min(1).max(5),
  tingkatDampakReputasi: z.enum(['Rendah', 'Menengah', 'Tinggi', 'Kritis']),
  dampakRegulasi: z.coerce.number().min(1).max(5),
  tingkatDampakRegulasi: z.enum(['Rendah', 'Menengah', 'Tinggi', 'Kritis']),

  skorKemungkinan: z.coerce.number().min(1).max(5),
  tingkatKemungkinan: z.enum(['Jarang', 'Mungkin', 'Sering']),
  
  risikoResidual: z.enum(['Rendah', 'Menengah', 'Tinggi', 'Kritis']),
  batasKriteria: z.enum(['Rendah', 'Menengah', 'Tinggi', 'Kritis']),
  
  riskOwner: z.string().min(1, 'Risk owner harus diisi.'),
  processOwner: z.string().optional(),
  productOwner: z.string().optional(),
  
  treatmentPlan: z.string().min(1, 'Risk treatment plan harus diisi.'),
  deskripsiTreatmentPlan: z.string().min(1, 'Deskripsi treatment plan harus diisi.'),
  isFraud: z.enum(['Ya', 'Tidak']),
  
  keterangan: z.string().optional(),
});

type AddRiskFormValues = z.infer<typeof formSchema>;

export function AddRiskForm({
  onSuccess,
  division,
}: {
  onSuccess: () => void;
  division: string;
}) {
  const { toast } = useToast();
  const form = useForm<AddRiskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kategori: '',
      riskEvent: '',
      rootCause: '',
      dampak: '',
      dampakKeuangan: 1,
      tingkatDampakKeuangan: 'Rendah',
      dampakOperasional: 1,
      tingkatDampakOperasional: 'Rendah',
      dampakReputasi: 1,
      tingkatDampakReputasi: 'Rendah',
      dampakRegulasi: 1,
      tingkatDampakRegulasi: 'Rendah',
      skorKemungkinan: 1,
      tingkatKemungkinan: 'Jarang',
      risikoResidual: 'Rendah',
      batasKriteria: 'Rendah',
      riskOwner: `Kantor Pusat - ${division}`,
      processOwner: '',
      productOwner: '',
      treatmentPlan: '',
      deskripsiTreatmentPlan: '',
      isFraud: 'Tidak',
      keterangan: '',
    },
  });

  function onSubmit(values: AddRiskFormValues) {
    console.log(values);
    toast({
      title: 'Sukses!',
      description: 'Data risiko baru berhasil ditambahkan.',
    });
    onSuccess();
  }

  const renderSelect = (name: keyof AddRiskFormValues, placeholder: string, items: string[]) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value as string}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
  
  const renderInput = (name: keyof AddRiskFormValues, placeholder: string, type: string = "text", disabled: boolean = false) => (
      <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
              <FormItem>
                  <FormLabel>{name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</FormLabel>
                  <FormControl>
                      <Input placeholder={placeholder} type={type} {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
              </FormItem>
          )}
      />
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ScrollArea className="h-[60vh] pr-6">
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('kategori', 'Contoh: Tata Kelola TI')}
                    {renderInput('riskEvent', 'Contoh: Kegagalan implementasi platform baru')}
                </div>

                <FormField
                    control={form.control}
                    name="rootCause"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Root Cause</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Deskripsi penyebab utama risiko..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dampak"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dampak</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Deskripsi dampak yang mungkin terjadi..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <h3 className="text-lg font-medium border-b pb-2">Penilaian Dampak</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {renderInput('dampakKeuangan', '1-5', 'number')}
                    {renderSelect('tingkatDampakKeuangan', 'Pilih tingkat', ['Rendah', 'Menengah', 'Tinggi', 'Kritis'])}
                    {renderInput('dampakOperasional', '1-5', 'number')}
                    {renderSelect('tingkatDampakOperasional', 'Pilih tingkat', ['Rendah', 'Menengah', 'Tinggi', 'Kritis'])}
                    {renderInput('dampakReputasi', '1-5', 'number')}
                    {renderSelect('tingkatDampakReputasi', 'Pilih tingkat', ['Rendah', 'Menengah', 'Tinggi', 'Kritis'])}
                    {renderInput('dampakRegulasi', '1-5', 'number')}
                    {renderSelect('tingkatDampakRegulasi', 'Pilih tingkat', ['Rendah', 'Menengah', 'Tinggi', 'Kritis'])}
                </div>

                <h3 className="text-lg font-medium border-b pb-2">Penilaian Kemungkinan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('skorKemungkinan', '1-5', 'number')}
                    {renderSelect('tingkatKemungkinan', 'Pilih tingkat', ['Jarang', 'Mungkin', 'Sering'])}
                </div>

                <h3 className="text-lg font-medium border-b pb-2">Tingkat Risiko & Kepemilikan</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderSelect('risikoResidual', 'Pilih tingkat', ['Rendah', 'Menengah', 'Tinggi', 'Kritis'])}
                    {renderSelect('batasKriteria', 'Pilih tingkat', ['Rendah', 'Menengah', 'Tinggi', 'Kritis'])}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {renderInput('riskOwner', '', 'text', true)}
                    {renderInput('processOwner', 'Contoh: Kepala Divisi Operasional')}
                    {renderInput('productOwner', 'Contoh: Manajer Produk Digital')}
                </div>
                
                <h3 className="text-lg font-medium border-b pb-2">Rencana Penanganan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('treatmentPlan', 'Contoh: Mitigate')}
                    {renderSelect('isFraud', 'Pilih indikasi', ['Ya', 'Tidak'])}
                </div>
                <FormField
                    control={form.control}
                    name="deskripsiTreatmentPlan"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deskripsi Rencana Penanganan Risiko</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Jelaskan secara detail rencana penanganan..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="keterangan"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Keterangan Tambahan</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Informasi tambahan jika ada..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </ScrollArea>
        <div className="flex justify-end pt-4 border-t">
          <Button type="submit">Simpan Risiko</Button>
        </div>
      </form>
    </Form>
  );
}
