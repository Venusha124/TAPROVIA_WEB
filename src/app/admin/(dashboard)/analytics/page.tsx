import React from "react";
import { getAnalyticsSummary } from "@/actions/analytics";
import { Zap, Map, MousePointer, Monitor } from "lucide-react";

export default async function AnalyticsPage() {
    const { activeUsers, topCountries, topPages } = await getAnalyticsSummary();

    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-serif text-white font-light mb-2">Web Analytics</h1>
                <p className="text-white/40 text-sm">Real-time traffic and audience insights.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Active Users */}
                <div className="bg-[#050505] border border-white/5 rounded-2xl p-8 flex items-center gap-6">
                    <div className="p-4 rounded-full bg-green-500/10 text-green-400">
                        <Zap size={32} />
                    </div>
                    <div>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Active Users (15m)</p>
                        <h2 className="text-4xl font-serif text-white">{activeUsers}</h2>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] text-white/30 uppercase tracking-widest">Live Now</span>
                        </div>
                    </div>
                </div>

                {/* Top Country */}
                <div className="bg-[#050505] border border-white/5 rounded-2xl p-8 flex items-center gap-6">
                    <div className="p-4 rounded-full bg-blue-500/10 text-blue-400">
                        <Map size={32} />
                    </div>
                    <div>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Top Region</p>
                        <h2 className="text-xl font-serif text-white line-clamp-1">
                            {topCountries.length > 0 ? (topCountries[0].code === 'Unknown' ? 'Global' : topCountries[0].code) : "N/A"}
                        </h2>
                        <p className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">
                            {topCountries.length > 0 ? `${topCountries[0].count} Visits` : 'No Data'}
                        </p>
                    </div>
                </div>

                {/* Top Page */}
                <div className="bg-[#050505] border border-white/5 rounded-2xl p-8 flex items-center gap-6">
                    <div className="p-4 rounded-full bg-[#D2B48C]/10 text-[#D2B48C]">
                        <MousePointer size={32} />
                    </div>
                    <div>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Top Page</p>
                        <h2 className="text-lg font-serif text-white line-clamp-1" title={topPages.length > 0 ? topPages[0].path : ""}>
                            {topPages.length > 0 ? topPages[0].path : "N/A"}
                        </h2>
                        <p className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">
                            {topPages.length > 0 ? `${topPages[0].count} Views` : 'No Data'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Detailed Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Traffic by Country */}
                <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Map size={18} className="text-[#D2B48C]" />
                        <h3 className="text-lg font-serif text-white">Traffic by Region</h3>
                    </div>

                    <div className="space-y-4">
                        {topCountries.length === 0 ? (
                            <p className="text-white/20 text-sm text-center py-8">No traffic data yet.</p>
                        ) : (
                            topCountries.map((country, idx) => (
                                <div key={idx} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <span className="text-white/20 text-xs font-mono w-4">{idx + 1}</span>
                                        <span className="text-white/80 text-sm font-medium">{country.code === 'Unknown' ? 'Unknown / Local' : country.code}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#D2B48C]/50 rounded-full"
                                                style={{ width: `${(country.count / Math.max(...topCountries.map(c => c.count))) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-white/40 text-xs w-8 text-right">{country.count}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Top Pages */}
                <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Monitor size={18} className="text-[#D2B48C]" />
                        <h3 className="text-lg font-serif text-white">Popular Pages</h3>
                    </div>

                    <div className="space-y-4">
                        {topPages.length === 0 ? (
                            <p className="text-white/20 text-sm text-center py-8">No page data yet.</p>
                        ) : (
                            topPages.map((page, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <span className="text-white/20 text-xs font-mono w-4 shrink-0">{idx + 1}</span>
                                        <span className="text-white/80 text-sm font-medium truncate">{page.path}</span>
                                    </div>
                                    <span className="text-white/40 text-xs shrink-0">{page.count}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
