"use client";

import { useState } from "react";
import {
  CheckCircledIcon,
  LockClosedIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import type { Role } from "@prisma/client";
import type { AdminUserDTO } from "@/server/modules/users/queries";
import {
  createUserAction,
  revokeUserSessionsAction,
  updateUserAccessAction,
} from "@/server/modules/users/actions";
import { useAdminMutation } from "@/components/admin/useAdminMutation";
import { AdminFeedbackBanner } from "@/components/admin/AdminFeedbackBanner";
import { RadixConfirmDialog } from "@/components/admin/ui/RadixConfirmDialog";

const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Administrator",
  EDITOR: "Editor Konten",
  ANALYST: "Analis",
  VIEWER: "Pemeriksa (Baca Saja)",
};

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export interface UsersManagerProps {
  users: AdminUserDTO[];
  currentUserId: string;
  activeAdminCount: number;
}

export function UsersManager({
  users,
  currentUserId,
  activeAdminCount,
}: UsersManagerProps) {
  const { isOnline, isPending, feedback, clearFeedback, execute } =
    useAdminMutation();

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<Role>("EDITOR");

  const [revokeTarget, setRevokeTarget] = useState<AdminUserDTO | null>(null);
  const [deactivateTarget, setDeactivateTarget] = useState<AdminUserDTO | null>(
    null
  );

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await execute(
      () =>
        createUserAction({
          name: newName,
          email: newEmail,
          password: newPassword,
          role: newRole,
        }),
      {
        onSuccess: () => {
          setNewName("");
          setNewEmail("");
          setNewPassword("");
          setNewRole("EDITOR");
        },
      }
    );
  };

  const handleRoleOrActiveChange = async (
    targetUser: AdminUserDTO,
    nextRole: Role,
    nextActive: boolean
  ) => {
    await execute(() =>
      updateUserAccessAction({
        userId: targetUser.id,
        role: nextRole,
        isActive: nextActive,
      })
    );
  };

  const handleRevokeSessions = async (targetUser: AdminUserDTO) => {
    await execute(() =>
      revokeUserSessionsAction({
        userId: targetUser.id,
      })
    );
  };

  return (
    <div className="space-y-6">
      <AdminFeedbackBanner
        isOnline={isOnline}
        feedback={feedback}
        onDismiss={clearFeedback}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        <section
          aria-label="Tambah akun internal baru"
          className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5 shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730]"
        >
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#041E42] dark:text-[#F1F5FB]">
              Tambah Akun Pengguna Internal
            </h2>
            <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
              Kata sandi dienkripsi dengan algoritma bcrypt (cost 12). Tidak ada
              fitur pendaftaran publik.
            </p>
          </div>

          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label
                htmlFor="user-name"
                className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
              >
                Nama Lengkap Anggota Tim
              </label>
              <input
                id="user-name"
                type="text"
                required
                minLength={3}
                maxLength={80}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Contoh: Raka Pradipta"
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
              />
            </div>

            <div>
              <label
                htmlFor="user-email"
                className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
              >
                Alamat Email Kerja
              </label>
              <input
                id="user-email"
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="raka@nextkarya.id"
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
              />
            </div>

            <div>
              <label
                htmlFor="user-password"
                className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
              >
                Kata Sandi Awal
              </label>
              <input
                id="user-password"
                type="password"
                required
                minLength={10}
                maxLength={128}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 10 karakter (huruf besar, kecil & angka)"
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
              />
            </div>

            <div>
              <label
                htmlFor="user-role"
                className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
              >
                Peran Hak Akses (RBAC)
              </label>
              <select
                id="user-role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as Role)}
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
              >
                <option value="EDITOR">Editor Konten (Kelola & Terbitkan)</option>
                <option value="ANALYST">Analis (Akses Metrik & Baca)</option>
                <option value="VIEWER">Viewer (Hanya Baca)</option>
                <option value="ADMIN">Administrator (Akses Penuh)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0066FF] px-4 text-xs font-semibold text-white hover:bg-[#0052CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] disabled:opacity-60 dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] dark:focus-visible:outline-[#38BDF8]"
            >
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
              <span>
                {isPending ? "Membuat Akun..." : "Buat Akun Pengguna"}
              </span>
            </button>
          </form>
        </section>

        <section
          aria-label="Daftar akun pengguna internal"
          className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5 shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4 dark:border-[#1E3358]">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#041E42] dark:text-[#F1F5FB]">
                Daftar Pengguna Terdaftar ({users.length})
              </h2>
              <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                Administrator aktif saat ini: {activeAdminCount}. Sistem menolak
                penghapusan atau penonaktifan Administrator terakhir.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {users.map((u) => {
              const isSelf = u.id === currentUserId;
              return (
                <article
                  key={u.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 dark:border-[#1E3358] dark:bg-[#12213F]/50"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-[#041E42] dark:text-[#F1F5FB] flex items-center gap-2">
                        <span>{u.name}</span>
                        {isSelf && (
                          <span className="rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-[#0066FF] dark:border-[#60A5FA] dark:bg-[#0B1730] dark:text-[#60A5FA]">
                            Akun Anda
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">{u.email}</p>
                      <p className="mt-1 text-[11px] text-[#5A6E85] dark:text-[#94A7C4]">
                        Peran: {ROLE_LABELS[u.role]} · Versi sesi: #
                        {u.sessionVersion} · Login terakhir:{" "}
                        {u.lastLoginAt
                          ? `${dateTimeFormatter.format(
                              new Date(u.lastLoginAt)
                            )} WIB`
                          : "Belum tercatat"}
                      </p>
                    </div>

                    <span
                      className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${
                        u.isActive
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-[#34D399]/60 dark:bg-[#0B1730] dark:text-[#34D399]"
                          : "border-rose-200 bg-rose-50 text-rose-700 dark:border-[#F87171]/60 dark:bg-[#0B1730] dark:text-[#FCA5A5]"
                      }`}
                    >
                      {u.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3 dark:border-[#1E3358]">
                    <div className="flex flex-wrap items-center gap-2">
                      <label htmlFor={`role-${u.id}`} className="sr-only">
                        Ubah peran {u.name}
                      </label>
                      <select
                        id={`role-${u.id}`}
                        disabled={isPending || isSelf}
                        value={u.role}
                        onChange={(e) =>
                          handleRoleOrActiveChange(
                            u,
                            e.target.value as Role,
                            u.isActive
                          )
                        }
                        className="min-h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs font-semibold text-[#041E42] disabled:opacity-50 dark:border-[#4E6E9E] dark:bg-[#0B1730] dark:text-[#F1F5FB]"
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="EDITOR">EDITOR</option>
                        <option value="ANALYST">ANALYST</option>
                        <option value="VIEWER">VIEWER</option>
                      </select>

                      <button
                        type="button"
                        disabled={isPending || isSelf}
                        onClick={() => {
                          if (u.isActive) {
                            setDeactivateTarget(u);
                          } else {
                            handleRoleOrActiveChange(u, u.role, true);
                          }
                        }}
                        className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 text-xs font-semibold text-[#041E42] hover:bg-slate-100 disabled:opacity-50 dark:border-[#4E6E9E] dark:bg-[#0B1730] dark:text-[#F1F5FB] dark:hover:bg-[#12213F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                      >
                        <CheckCircledIcon className="h-3.5 w-3.5" />
                        <span>
                          {u.isActive ? "Nonaktifkan Akun" : "Aktifkan Akun"}
                        </span>
                      </button>
                    </div>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => setRevokeTarget(u)}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-50 dark:border-[#F87171]/60 dark:bg-[#0B1730] dark:text-[#FCA5A5] dark:hover:bg-[#12213F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                    >
                      <LockClosedIcon className="h-3.5 w-3.5" />
                      <span>Cabut Semua Sesi</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <RadixConfirmDialog
            open={deactivateTarget !== null}
            onOpenChange={(open) => !open && setDeactivateTarget(null)}
            title="Nonaktifkan Akun Pengguna"
            description={`Akun "${deactivateTarget?.name}" (${deactivateTarget?.email}) akan dinonaktifkan. Pengguna tidak akan dapat masuk ke sistem sampai akun diaktifkan kembali.`}
            confirmLabel="Nonaktifkan Akun"
            isDestructive={true}
            isPending={isPending}
            onConfirm={() => {
              if (deactivateTarget) {
                return handleRoleOrActiveChange(
                  deactivateTarget,
                  deactivateTarget.role,
                  false
                );
              }
            }}
          />

          <RadixConfirmDialog
            open={revokeTarget !== null}
            onOpenChange={(open) => !open && setRevokeTarget(null)}
            title="Cabut Semua Sesi Pengguna"
            description={`Seluruh sesi aktif milik "${revokeTarget?.name}" (${revokeTarget?.email}) akan dicabut seketika. Pengguna akan dikeluarkan dari sistem pada permintaan berikutnya.`}
            confirmLabel="Cabut Semua Sesi"
            isDestructive={true}
            isPending={isPending}
            onConfirm={() => {
              if (revokeTarget) {
                return handleRevokeSessions(revokeTarget);
              }
            }}
          />
        </section>
      </div>
    </div>
  );
}
