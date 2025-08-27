
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mb-8 text-center">
        <div className="flex justify-center items-center gap-4 mb-4">
             <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="h-16 w-auto text-primary"
                fill="currentColor"
            >
                <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z" />
                <path d="M172.42 72.83a8 8 0 0 0-10.84 2.83l-56 96a8 8 0 0 0 13.68 8l56-96a8 8 0 0 0-2.84-10.83Z" />
            </svg>
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white">SMART</h1>
        </div>
        <p className="text-lg text-muted-foreground">Strategic Management & Risk Tracking</p>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Pilih peran Anda untuk melanjutkan ke dasbor.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <Button size="lg" className="w-full" onClick={() => router.push('/')}>
                <User className="mr-2" />
                Masuk sebagai User
            </Button>
            <Button size="lg" variant="outline" className="w-full" onClick={() => router.push('/admin/rcsa')}>
                <Shield className="mr-2" />
                Masuk sebagai Admin
            </Button>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-center text-muted-foreground w-full">
                Ini adalah simulasi login. Tidak ada data kredensial yang diperlukan.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
