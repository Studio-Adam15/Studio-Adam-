import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  FileCode2,
  FolderArchive,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Language } from '../types';
import { buildZipBytes, triggerUint8Download } from '../utils/zipBuilder';

import indexHtmlRaw from '../../static-export/index.html?raw';
import styleCssRaw from '../../static-export/style.css?raw';
import scriptJsRaw from '../../static-export/script.js?raw';
import readmeMdRaw from '../../static-export/README.md?raw';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

type CodeFileKey = 'index.html' | 'style.css' | 'script.js' | 'README.md';

const CODE_FILES: Record<CodeFileKey, string> = {
  'index.html': indexHtmlRaw,
  'style.css': styleCssRaw,
  'script.js': scriptJsRaw,
  'README.md': readmeMdRaw,
};

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, lang }) => {
  const isAr = lang === 'ar';
  const [activeFile, setActiveFile] = useState<CodeFileKey>('index.html');
  const [copiedKey, setCopiedKey] = useState<CodeFileKey | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'done' | 'error'>('idle');
  const [progressPct, setProgressPct] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;
    setDownloadStatus('idle');
    setProgressPct(0);
    setErrorMsg('');

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Download Full Bundle (40 MB) using authenticated fetch + PK signature verification
  // This bypasses Android DownloadManager's cookie-less GET that triggers the "Cookie check" HTML screen.
  const handleDownloadFullZip = async () => {
    setDownloadStatus('downloading');
    setProgressPct(0);
    setErrorMsg('');

    try {
      const response = await fetch('/studio-adam-website.zip', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = (response.headers.get('content-type') || '').toLowerCase();
      if (contentType.includes('text/html')) {
        throw new Error('COOKIE_BLOCKED');
      }

      const totalHeader = Number(response.headers.get('content-length') || 0);
      const reader = response.body?.getReader();

      let bytes: Uint8Array;
      if (reader) {
        const chunks: Uint8Array[] = [];
        let received = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            received += value.length;
            if (totalHeader > 0) {
              setProgressPct(Math.min(99, Math.round((received / totalHeader) * 100)));
            }
          }
        }

        bytes = new Uint8Array(received);
        let offset = 0;
        for (const chunk of chunks) {
          bytes.set(chunk, offset);
          offset += chunk.length;
        }
      } else {
        const buf = await response.arrayBuffer();
        bytes = new Uint8Array(buf);
      }

      // Verify ZIP magic header ('PK' = 0x50 0x4B) to guarantee we never save an HTML auth page
      if (bytes.length < 4 || bytes[0] !== 0x50 || bytes[1] !== 0x4b) {
        throw new Error('COOKIE_BLOCKED');
      }

      setProgressPct(100);
      triggerUint8Download(bytes, 'studio-adam-website.zip');
      setDownloadStatus('done');
    } catch (err) {
      setDownloadStatus('error');
      const code = err instanceof Error ? err.message : '';
      if (code === 'COOKIE_BLOCKED') {
        setErrorMsg(
          isAr
            ? 'متصفح الهاتف منع ملف ZIP الكبير بسبب قيود الكوكيز. استخدم زر «تحميل ملفات الكود ZIP» الفوري أدناه أو انسخ الملفات مباشرة.'
            : 'Your mobile browser blocked the large archive due to cookie restrictions. Use the instant Code ZIP button below or copy each file directly.'
        );
      } else {
        setErrorMsg(
          isAr
            ? 'تعذر تحميل الحزمة الكاملة. يمكنك استخدام زر «تحميل ملفات الكود ZIP» أدناه بدون أي قيود.'
            : 'Unable to fetch the full bundle. Use the instant Code ZIP button below with zero restrictions.'
        );
      }
    }
  };

  // Zero-network, zero-cookie instant ZIP containing index.html, style.css, script.js, README.md
  const handleDownloadCodeOnlyZip = () => {
    const zipBytes = buildZipBytes([
      { name: 'index.html', content: indexHtmlRaw },
      { name: 'style.css', content: styleCssRaw },
      { name: 'script.js', content: scriptJsRaw },
      { name: 'README.md', content: readmeMdRaw },
    ]);
    triggerUint8Download(zipBytes, 'studio-adam-code.zip');
  };

  const handleCopyFile = async (key: CodeFileKey) => {
    try {
      await navigator.clipboard.writeText(CODE_FILES[key]);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Fallback copy via textarea
      const ta = document.createElement('textarea');
      ta.value = CODE_FILES[key];
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    }
  };

  return (
    <div
      data-lenis-prevent
      onClick={onClose}
      className="fixed inset-0 z-[95] bg-[#072623]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={isAr ? 'تصدير وتحميل ملفات الموقع' : 'Export & Download Website Package'}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#f3efe4] text-[#0b423d] rounded-[28px] border border-[#dcd6c4] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 sm:p-7 bg-white border-b border-[#dcd6c4] flex items-start justify-between gap-4">
          <div className="text-start">
            <div className="text-xs font-extrabold text-[#0d4f49] mb-1">
              STUDIO ADAM · Static Export
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0b423d] tracking-tight">
              {isAr ? 'تحميل ملفات الموقع (ZIP)' : 'Download Static Website Package'}
            </h2>
            <p className="text-xs sm:text-sm text-[#5f7a72] font-semibold mt-1">
              {isAr
                ? 'index.html · style.css · script.js · assets/ · README.md'
                : 'index.html · style.css · script.js · assets/ · README.md'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={isAr ? 'إغلاق' : 'Close'}
            className="w-10 h-10 rounded-full bg-[#f3efe4] hover:bg-[#0d4f49] text-[#0b423d] hover:text-white border border-[#dcd6c4] flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Download Buttons Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full ZIP (with 7 videos + 8 designs + logos) */}
            <button
              type="button"
              disabled={downloadStatus === 'downloading'}
              onClick={handleDownloadFullZip}
              className="p-5 rounded-2xl bg-[#0d4f49] hover:bg-[#0a3f3a] disabled:opacity-75 text-white text-start flex flex-col justify-between gap-3 shadow-md transition-all cursor-pointer dots-dark"
            >
              <div className="flex items-center justify-between w-full relative z-10">
                <FolderArchive className="w-6 h-6 text-[#bfe8c8]" />
                <span className="text-xs font-mono font-bold text-[#bfe8c8]">~39.9 MB · ZIP</span>
              </div>
              <div className="relative z-10">
                <div className="font-black text-base flex items-center gap-2">
                  {downloadStatus === 'downloading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>
                        {isAr ? `جاري التحميل... ${progressPct}%` : `Downloading... ${progressPct}%`}
                      </span>
                    </>
                  ) : downloadStatus === 'done' ? (
                    <>
                      <Check className="w-4 h-4 text-[#bfe8c8]" />
                      <span>{isAr ? 'تم تنزيل الحزمة الكاملة!' : 'Full Bundle Downloaded!'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>
                        {isAr ? 'تحميل الحزمة الكاملة + الفيديوهات' : 'Download Full Bundle + Media'}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-white/80 font-semibold mt-1">
                  {isAr
                    ? 'يشمل الكود + جميع الشعارات والصور الـ 8 وفيديوهات UGC الـ 7'
                    : 'Includes all code + logos + 8 social designs + 7 UGC videos'}
                </p>
              </div>
            </button>

            {/* Instant Code-Only ZIP (Zero Network / Zero Cookie Check) */}
            <button
              type="button"
              onClick={handleDownloadCodeOnlyZip}
              className="p-5 rounded-2xl bg-white hover:bg-[#ece7d8] text-[#0b423d] border border-[#dcd6c4] hover:border-[#0d4f49] text-start flex flex-col justify-between gap-3 shadow-xs transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <FileCode2 className="w-6 h-6 text-[#0d4f49]" />
                <span className="text-xs font-mono font-bold text-[#5f7a72]">~45 KB · ZIP</span>
              </div>
              <div>
                <div className="font-black text-base flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#0d4f49]" />
                  <span>{isAr ? 'تحميل ملفات الكود فقط (ZIP فوري)' : 'Download Code Files (Instant ZIP)'}</span>
                </div>
                <p className="text-xs text-[#5f7a72] font-semibold mt-1">
                  {isAr
                    ? 'index.html و style.css و script.js و README.md — يعمل فوراً بلا قيود'
                    : 'index.html, style.css, script.js, README.md — instant offline build'}
                </p>
              </div>
            </button>
          </div>

          {downloadStatus === 'error' && errorMsg && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold flex items-start gap-2.5 text-start">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Direct Code Inspection & Copy Tabs */}
          <div className="bg-white border border-[#dcd6c4] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 bg-[#fbfaf5] border-b border-[#dcd6c4] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 flex-wrap" role="tablist">
                {(Object.keys(CODE_FILES) as CodeFileKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={activeFile === key}
                    onClick={() => setActiveFile(key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      activeFile === key
                        ? 'bg-[#0d4f49] text-white'
                        : 'text-[#5f7a72] hover:text-[#0b423d] hover:bg-[#ece7d8]'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleCopyFile(activeFile)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e7efe9] hover:bg-[#0d4f49] text-[#0d4f49] hover:text-white text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap"
              >
                {copiedKey === activeFile ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تم النسخ!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isAr ? `نسخ ${activeFile}` : `Copy ${activeFile}`}</span>
                  </>
                )}
              </button>
            </div>

            <pre
              dir="ltr"
              className="p-4 text-[11px] sm:text-xs font-mono text-[#14352f] bg-[#fbfaf5] overflow-x-auto max-h-64 text-left leading-relaxed"
            >
              {CODE_FILES[activeFile]}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
