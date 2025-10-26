import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { QRScannerView } from '@/components/QRScannerView';
import { ScanResultCard } from '@/components/ScanResultCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Camera, X, QrCode, Clock, Trash } from '@phosphor-icons/react';
import { useQRScanner } from '@/hooks/use-qr-scanner';
import { ScanResult, detectContentType } from '@/lib/types';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [history, setHistory] = useKV<ScanResult[]>('scan-history', []);

  const handleScan = (content: string) => {
    const currentHistory = history || [];
    const lastScan = currentHistory[0];
    if (lastScan && lastScan.content === content && Date.now() - lastScan.timestamp < 3000) {
      return;
    }

    const newResult: ScanResult = {
      id: `${Date.now()}-${Math.random()}`,
      content,
      type: detectContentType(content),
      timestamp: Date.now(),
    };

    setHistory((currentHistory) => [newResult, ...(currentHistory || [])]);
    
    setShowSuccess(true);
    toast.success('QR Code Scanned!', {
      description: content.length > 50 ? content.substring(0, 50) + '...' : content,
    });

    setTimeout(() => setShowSuccess(false), 600);
  };

  const { videoRef, hasPermission, error, isScanning: scannerActive } = useQRScanner(
    handleScan,
    isScanning
  );

  const handleDeleteScan = (id: string) => {
    setHistory((currentHistory) => (currentHistory || []).filter(item => item.id !== id));
    toast.success('Scan removed from history');
  };

  const handleClearHistory = () => {
    setHistory([]);
    toast.success('History cleared');
  };

  const currentHistory = history || [];

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6">
      <Toaster />
      
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <QrCode size={24} weight="bold" className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">QR Scanner</h1>
              <p className="text-sm text-muted-foreground tracking-wide">
                Scan QR codes instantly
              </p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Camera</h2>
                <Button
                  variant={isScanning ? "destructive" : "default"}
                  onClick={() => setIsScanning(!isScanning)}
                >
                  {isScanning ? (
                    <>
                      <X size={18} className="mr-2" />
                      Stop Scanning
                    </>
                  ) : (
                    <>
                      <Camera size={18} className="mr-2" />
                      Start Scanning
                    </>
                  )}
                </Button>
              </div>

              <div className="aspect-square w-full">
                <QRScannerView
                  videoRef={videoRef as React.RefObject<HTMLVideoElement>}
                  isScanning={scannerActive}
                  hasPermission={hasPermission}
                  error={error}
                  showSuccess={showSuccess}
                />
              </div>

              {isScanning && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="tracking-wide">Scanning for QR codes...</span>
                </div>
              )}
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-muted-foreground" />
                  <h2 className="text-lg font-semibold">Scan History</h2>
                  <span className="text-sm text-muted-foreground">
                    ({currentHistory.length})
                  </span>
                </div>
                {currentHistory.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearHistory}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash size={16} className="mr-2" />
                    Clear All
                  </Button>
                )}
              </div>

              <Separator />

              <ScrollArea className="h-[500px] lg:h-[600px] pr-4">
                {currentHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <QrCode size={64} className="text-muted-foreground/40 mb-4" />
                    <p className="text-sm text-muted-foreground">
                      No scans yet
                    </p>
                    <p className="text-xs text-muted-foreground/80 mt-1">
                      Start scanning to see your history
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentHistory.map((result) => (
                      <ScanResultCard
                        key={result.id}
                        result={result}
                        onDelete={handleDeleteScan}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;