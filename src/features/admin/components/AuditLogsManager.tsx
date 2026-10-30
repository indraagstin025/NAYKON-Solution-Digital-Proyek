"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import type { AdminAuditLogDTO } from "@/server/modules/audit/queries";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/RadixTabs";

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export interface AuditLogsManagerProps {
  logs: AdminAuditLogDTO[];
  entityTypes: string[];
}

export function AuditLogsManager({ logs, entityTypes }: AuditLogsManagerProps) {
  const [entityFilter, setEntityFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return logs.filter((log) => {
      if (entityFilter !== "ALL" && log.entityType !== entityFilter) {
        return false;
      }
      if (!q) return true;
      return (
        log.action.toLowerCase().includes(q) ||
        log.entityType.toLowerCase().includes(q) ||
        log.userName.toLowerCase().includes(q) ||
        log.summaryText.toLowerCase().includes(q) ||
        (log.entityId ?? "").toLowerCase().includes(q)
      );
    });
  }, [logs, entityFilter, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs space-y-4 dark:border-[#1E3358] dark:bg-[#0B1730]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Tabs value={entityFilter} onValueChange={setEntityFilter}>
            <TabsList aria-label="Filter entitas log audit">
              {entityTypes.map((entity) => (
                <TabsTrigger key={entity} value={entity}>
                  {entity === "ALL" ? "Semua Entitas" : entity}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="relative w-full lg:w-72">
            <label htmlFor="audit-search" className="sr-only">
              Cari aksi, pelaku, atau entitas
            </label>
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5A6E85] dark:text-[#94A7C4]"
              aria-hidden="true"
            />
            <input
              id="audit-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari aksi atau pelaku..."
              className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#005090] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#0986C8]"
            />
          </div>
        </div>
      </div>

      <section
        aria-label="Tabel catatan audit keamanan"
        className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730]"
      >
        {filteredLogs.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#5A6E85] dark:text-[#94A7C4]">
            Tidak ada catatan log audit yang cocok dengan filter saat ini.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-[#5A6E85] dark:border-[#1E3358] dark:text-[#94A7C4]">
                  <th scope="col" className="pb-2.5 pr-4">
                    Aksi Sistem
                  </th>
                  <th scope="col" className="pb-2.5 pr-4">
                    Entitas
                  </th>
                  <th scope="col" className="pb-2.5 pr-4">
                    Pelaku
                  </th>
                  <th scope="col" className="pb-2.5 pr-4">
                    Ringkasan Perubahan (Tersanitasi)
                  </th>
                  <th scope="col" className="pb-2.5 text-right">
                    Waktu Kejadian (WIB)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E3358]">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="align-top">
                    <td className="py-3 pr-4">
                      <p className="font-mono text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB]">
                        {log.action}
                      </p>
                      {log.ipHash && (
                        <p className="mt-0.5 font-mono text-[10px] text-[#5A6E85] dark:text-[#94A7C4]">
                          IP Hash: {log.ipHash}
                        </p>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-block rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-semibold text-[#041E42] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB]">
                        {log.entityType}
                      </span>
                      {log.entityId && (
                        <p className="mt-0.5 font-mono text-[10px] text-[#5A6E85] dark:text-[#94A7C4]">
                          ID: {log.entityId}
                        </p>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      <p className="text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB]">
                        {log.userName}
                      </p>
                      {log.userEmail && (
                        <p className="text-[11px] text-[#5A6E85] dark:text-[#94A7C4]">
                          {log.userEmail}
                        </p>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                      {log.summaryText}
                    </td>
                    <td className="py-3 text-right text-xs tabular-nums text-[#5A6E85] dark:text-[#94A7C4]">
                      {dateTimeFormatter.format(new Date(log.createdAt))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
