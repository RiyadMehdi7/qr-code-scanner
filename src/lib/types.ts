export interface ScanResult {
  id: string;
  content: string;
  type: 'url' | 'email' | 'phone' | 'text';
  timestamp: number;
}

export function detectContentType(content: string): ScanResult['type'] {
  const urlPattern = /^(https?:\/\/|www\.)/i;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[\d\s\-\+\(\)]+$/;

  if (urlPattern.test(content)) return 'url';
  if (emailPattern.test(content)) return 'email';
  if (phonePattern.test(content.replace(/[\s\-\(\)]/g, '')) && content.replace(/[\s\-\(\)]/g, '').length >= 10) return 'phone';
  return 'text';
}

export function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return new Date(timestamp).toLocaleDateString();
}
