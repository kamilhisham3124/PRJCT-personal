import React from "react";
import Link from "next/link";
import { Mail, CheckCircle2 } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#070B14]/80 mt-auto transition-colors">
      <div className="max-w-dense mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#635BFF] to-[#00D4FF] flex items-center justify-center text-white font-extrabold text-xs">
            KH
          </div>
          <div>
            <div className="font-display font-bold text-sm text-[#0A2540] dark:text-white">
              Kamil Hisham
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Full-Stack Systems Engineer
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <a
            href="https://github.com/kamilhisham3124"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 hover:text-[#635BFF] transition-all"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/kamilhisham"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 hover:text-[#635BFF] transition-all"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:kamil.hisham3124@gmail.com"
            aria-label="Email Address"
            className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 hover:text-[#635BFF] transition-all"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>WCAG 2.2 AA Conformance</span>
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-200/60 dark:border-slate-800/60 py-4 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Kamil Hisham. Designed with high-performance edge architecture.
      </div>
    </footer>
  );
}
