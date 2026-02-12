import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, MoreHorizontal, DollarSign, Calendar, Tag, RefreshCw } from 'lucide-react';
import { scrollReveal, viewportConfig } from '../lib/animations';
import { db } from '../lib/db';
import Button from '../components/Button';

const Column = ({ title, count, items, onAdd }) => (
    <motion.div className="flex-1 min-w-[300px] bg-[#14121D] rounded-xl border border-white/5 flex flex-col" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
        {/* Column Header */}
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-200 text-sm">{title}</h3>
                <span className="bg-white/10 text-slate-400 text-xs px-2 py-0.5 rounded-full">{count}</span>
            </div>
            <button className="text-slate-500 hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
            </button>
        </div>

        {/* Column Content */}
        <div className="p-3 space-y-3 flex-1 overflow-y-auto">
            {items.map((item) => (
                <div key={item.id} className="bg-[#1F1D2B] p-4 rounded-lg border border-white/5 hover:border-white/20 cursor-pointer group transition-all">
                    <div className="flex justify-between items-start mb-3">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${item.tagColor}`}>
                            {item.tag}
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                    <h4 className="text-white font-bold mb-1">{item.name}</h4>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-3">
                        <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {item.val}
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Just now
                        </div>
                    </div>
                </div>
            ))}

            {/* Add Button */}
            {onAdd && (
                <button
                    onClick={onAdd}
                    className="w-full py-2 flex items-center justify-center gap-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 border-dashed text-sm transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Add Deal
                </button>
            )}
        </div>
    </motion.div>
);

const CRM = () => {
    const [deals, setDeals] = useState({ leads: [], diligence: [], portfolio: [] });
    const [loading, setLoading] = useState(true);

    // Load data on mount
    useEffect(() => {
        const data = db.getDeals();
        setDeals(data);
        setLoading(false);
    }, []);

    const handleAddLead = () => {
        const tag = db.getRandomTag();
        const newDeal = {
            name: "New Venture " + Math.floor(Math.random() * 1000),
            tag: tag.name,
            tagColor: tag.color,
            val: "$1M"
        };
        const updated = db.saveDeal('leads', newDeal);
        setDeals({ ...updated }); // Spread to force re-render
    };

    return (
        <div className="flex-1 overflow-hidden h-full flex flex-col" data-scroll-container>
            {/* Header */}
            <motion.div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0D0C12]/50 backdrop-blur" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <h1 className="text-xl font-bold text-white flex items-center gap-3">
                    Deal Flow
                    <span className="text-xs font-normal text-slate-500 border-l border-white/10 pl-3">Internal CRM</span>
                    {loading && <RefreshCw className="w-3 h-3 animate-spin text-slate-500" />}
                </h1>
                <div className="flex gap-3">
                    <Button
                        icon={Plus}
                        onClick={handleAddLead}
                        className="uppercase italic font-black tracking-widest text-xs"
                    >
                        New Startup
                    </Button>
                </div>
            </motion.div>

            {/* Board Area */}
            <motion.div className="flex-1 overflow-x-auto p-8" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <div className="flex gap-6 h-full pb-4">
                    <Column title="New Leads" count={deals.leads.length} items={deals.leads} onAdd={handleAddLead} />
                    <Column title="Due Diligence" count={deals.diligence.length} items={deals.diligence} />
                    <Column title="Portfolio" count={deals.portfolio.length} items={deals.portfolio} />
                    {/* Empty Column for "Lost" or "Pass" */}
                    <div className="min-w-[300px] border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-400 hover:border-white/10 transition-colors cursor-pointer">
                        <span className="flex items-center gap-2 font-medium">
                            <Plus className="w-5 h-5" />
                            Add Column
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CRM;

