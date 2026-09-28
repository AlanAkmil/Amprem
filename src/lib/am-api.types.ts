export type HealthResult = {
  online: boolean;
  version?: string | undefined;
  uptime?: number | undefined;
  ts?: string | undefined;
  checkedAt: string;
};

export type PlanInfo = {
  name?: string | undefined;
  type?: string | undefined;
  duration?: string | undefined;
};

export type InfoResult = {
  ok: boolean;
  plan?: PlanInfo | undefined;
  benefits?: string[] | undefined;
};

export type ActionResult = {
  ok: boolean;
  message: string;
  code?: string | undefined;
  data?:
    | {
        email?: string | undefined;
        uid?: string | undefined;
        orderId?: string | undefined;
        plan?: string | undefined;
        duration?: string | undefined;
        validUntil?: string | undefined;
        benefits?: string[] | undefined;
      }
    | undefined;
};

export type DonationResult = {
  ok: boolean;
  message: string;
};

export function errorMessageFor(code?: string): string {
  switch (code) {
    case "INVALID_EMAIL":
      return "Format email tidak valid. Contoh yang benar: nama@gmail.com";
    case "INVALID_OOB_CODE":
      return "Link tidak valid atau sudah tidak dapat digunakan. Minta link baru melalui proses pengiriman email.";
    case "EXPIRED_OOB_CODE":
      return "Link sudah kedaluwarsa. Kirim link baru dan gunakan sebelum masa berlakunya habis.";
    case "TOO_MANY_ATTEMPTS":
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      return "Terlalu banyak percobaan. Tunggu beberapa saat sebelum mencoba lagi.";
    case "API_OFFLINE":
      return "API sedang tidak dapat dihubungi. Periksa koneksi internet lalu tekan Refresh Status.";
    case "ACTIVATION_FAILED":
      return "Link berhasil diproses, tetapi layanan aktivasi belum berhasil menyelesaikan proses. Coba kembali nanti atau hubungi pengelola layanan.";
    default:
      return "Terjadi kesalahan. Silakan coba beberapa saat lagi.";
  }
}
