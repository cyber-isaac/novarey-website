import React from 'react';
import { Moon, Sun, Sunrise } from 'lucide-react';

const ThemeToggle = ({ theme, onChange }) => {
    const base = "p-2 rounded-full border transition-colors";
    const active = "bg-white/10 border-white/20 text-white";
    const inactive = "border-white/10 text-slate-400 hover:text-white hover:border-white/20";

    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                className={`${base} ${theme === 'dark' ? active : inactive}`}
                onClick={() => onChange('dark')}
                title="Dark mode"
                aria-label="Dark mode"
            >
                <Moon className="w-4 h-4" />
            </button>
            <button
                type="button"
                className={`${base} ${theme === 'light' ? active : inactive}`}
                onClick={() => onChange('light')}
                title="Light mode"
                aria-label="Light mode"
            >
                <Sun className="w-4 h-4" />
            </button>
            <button
                type="button"
                className={`${base} ${theme === 'amber' ? active : inactive}`}
                onClick={() => onChange('amber')}
                title="Amber mode"
                aria-label="Amber mode"
            >
                <Sunrise className="w-4 h-4" />
            </button>
        </div>
    );
};

export default ThemeToggle;
