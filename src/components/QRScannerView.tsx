import { Camera } from '@phosphor-icons/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface QRScannerViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isScanning: boolean;
  hasPermission: boolean | null;
  error: string | null;
  showSuccess: boolean;
}

export function QRScannerView({ 
  videoRef, 
  isScanning, 
  hasPermission, 
  error,
  showSuccess 
}: QRScannerViewProps) {
  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
      />
      
      {isScanning && (
        <div className="absolute inset-0 pointer-events-none">
          <div className={cn(
            "absolute inset-8 border-4 rounded-2xl transition-all duration-300",
            showSuccess 
              ? "border-accent" 
              : "border-primary/60 scan-pulse"
          )}>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent -translate-x-1 -translate-y-1 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent translate-x-1 -translate-y-1 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent -translate-x-1 translate-y-1 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent translate-x-1 translate-y-1 rounded-br-lg" />
          </div>
          
          {showSuccess && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-accent/20 success-ripple" />
            </div>
          )}
        </div>
      )}

      {!isScanning && hasPermission === null && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm">
          <Camera size={64} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Ready to scan</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center p-6 bg-background/90 backdrop-blur-sm">
          <Alert variant="destructive" className="max-w-md">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
