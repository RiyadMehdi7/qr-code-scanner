import { ScanResult } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Trash, Link as LinkIcon, Envelope, Phone, TextAa } from '@phosphor-icons/react';
import { formatTimestamp } from '@/lib/types';
import { toast } from 'sonner';

interface ScanResultCardProps {
  result: ScanResult;
  onDelete: (id: string) => void;
}

export function ScanResultCard({ result, onDelete }: ScanResultCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(result.content);
    toast.success('Copied to clipboard');
  };

  const handleAction = () => {
    switch (result.type) {
      case 'url':
        const url = result.content.startsWith('http') 
          ? result.content 
          : `https://${result.content}`;
        window.open(url, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:${result.content}`;
        break;
      case 'phone':
        window.location.href = `tel:${result.content}`;
        break;
      default:
        handleCopy();
    }
  };

  const getIcon = () => {
    switch (result.type) {
      case 'url': return <LinkIcon size={16} weight="bold" />;
      case 'email': return <Envelope size={16} weight="bold" />;
      case 'phone': return <Phone size={16} weight="bold" />;
      default: return <TextAa size={16} weight="bold" />;
    }
  };

  const getActionLabel = () => {
    switch (result.type) {
      case 'url': return 'Open';
      case 'email': return 'Email';
      case 'phone': return 'Call';
      default: return 'Copy';
    }
  };

  return (
    <Card className="p-3 space-y-2 hover:bg-card/80 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="text-xs font-medium">
              <span className="mr-1">{getIcon()}</span>
              {result.type.toUpperCase()}
            </Badge>
            <span className="text-xs text-muted-foreground tracking-wide">
              {formatTimestamp(result.timestamp)}
            </span>
          </div>
          <p className="text-sm break-all line-clamp-2 font-mono">
            {result.content}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 shrink-0"
            onClick={handleCopy}
          >
            <Copy size={16} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
            onClick={() => onDelete(result.id)}
          >
            <Trash size={16} />
          </Button>
        </div>
      </div>
      <Button
        size="sm"
        variant="outline"
        className="w-full"
        onClick={handleAction}
      >
        {getActionLabel()}
      </Button>
    </Card>
  );
}
