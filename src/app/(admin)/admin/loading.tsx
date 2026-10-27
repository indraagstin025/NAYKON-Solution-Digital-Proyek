export default function AdminWorkspaceLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-[#1E3358] bg-[#0B1730] p-6 sm:p-8"
    >
      <p className="text-sm font-semibold text-[#F1F5FB]">
        Memuat ringkasan ruang kerja...
      </p>
      <p className="mt-1 text-xs text-[#94A7C4]">
        Mengambil status pesan masuk dan ringkasan konten terbaru dari database.
      </p>
    </div>
  );
}
