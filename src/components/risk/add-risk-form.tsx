
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

const formSchema = z.object({
  kategori: z.string().min(1, 'Kategori risiko harus diisi.'),
  riskEvent: z.string().min(1, 'Risk event harus diisi.'),
  risikoResidual: z.enum(['Rendah', 'Menengah', 'Tinggi', 'Kritis']),
  riskOwner: z.string().min(1, 'Risk owner harus diisi.'),
  treatmentPlan: z.string().min(1, 'Risk treatment plan harus diisi.'),
  isFraud: z.enum(['Ya', 'Tidak']),
  deskripsi: z.string().optional(),
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
      risikoResidual: 'Rendah',
      riskOwner: `Kantor Pusat - ${division}`,
      treatmentPlan: '',
      isFraud: 'Tidak',
      deskripsi: '',
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="kategori"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori Risiko/Proses</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Pengelolaan sistem bank" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="riskEvent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Event/Potensi Risiko</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Serangan siber" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="risikoResidual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risiko Residual</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tingkat risiko" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Rendah">Rendah</SelectItem>
                    <SelectItem value="Menengah">Menengah</SelectItem>
                    <SelectItem value="Tinggi">Tinggi</SelectItem>
                    <SelectItem value="Kritis">Kritis</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="riskOwner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Owner</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="treatmentPlan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Treatment Plan</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Mitigate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFraud"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indikasi Fraud</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih indikasi fraud" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Ya">Ya</SelectItem>
                    <SelectItem value="Tidak">Tidak</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
            control={form.control}
            name="deskripsi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Tambahan</FormLabel>
                <FormControl>
                  <Textarea placeholder="Deskripsi singkat mengenai risiko..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <div className="flex justify-end">
          <Button type="submit">Simpan Risiko</Button>
        </div>
      </form>
    </Form>
  );
}
