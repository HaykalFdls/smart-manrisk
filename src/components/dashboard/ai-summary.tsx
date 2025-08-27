'use client';
import { useState } from 'react';
import { generateRiskSummary } from '@/ai/flows/generate-risk-summary';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Wand2, AlertTriangle } from 'lucide-react';

const mockDashboardData = JSON.stringify({
  overallRiskScore: 7.2,
  creditRiskExposure: 1200000,
  operationalIncidents: 12,
  complianceStatus: '98.5%',
  riskTrends: {
    credit: 'increasing',
    operational: 'stable',
    market: 'decreasing',
  },
});

export default function AiSummary() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setSummary('');
    try {
      const result = await generateRiskSummary({
        dashboardData: mockDashboardData,
      });
      setSummary(result.summary);
    } catch (error) {
      console.error('Failed to generate summary:', error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Summary',
        description: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          <span>AI-Powered Risk Summary</span>
        </CardTitle>
        <CardDescription>
          Get a quick, intelligent overview of the current risk landscape.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : summary ? (
          <p className="text-sm text-muted-foreground">{summary}</p>
        ) : (
          <div className="text-center text-sm text-muted-foreground py-4">
            Click the button to generate your risk summary.
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGenerateSummary}
          disabled={isLoading}
          className="w-full"
        >
          <Wand2 className="mr-2 h-4 w-4" />
          {isLoading ? 'Generating...' : 'Generate Summary'}
        </Button>
      </CardFooter>
    </Card>
  );
}
