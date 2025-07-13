import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatRupiah(number: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
}

export function rupiahToDecimal(rupiah: string): number {
    const numeric = rupiah
        .replace(/[^0-9,-]+/g, '')
        .replace(',', '.');

    return parseFloat(numeric);
}

export function toSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-');
}

export function formatDateTime(isoString: string, options?: Intl.DateTimeFormatOptions) {
    const date = new Date(isoString);

    const formattedDate = new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour:  options?.hour,
        minute: options?.minute,
        hour12: false,
        timeZone: 'Asia/Jakarta'
    }).format(date);

    return formattedDate.replace(':', '.');
}

export function isLocalhost(url: URL): boolean {
  return url.hostname === '127.0.0.1' || url.hostname === 'localhost';
}
/**
 * Menghitung nilai rata-rata dari rating yang tersimpan dalam struktur data berlapis
 * dan memformatnya.
 *
 * @param data Array objek yang berisi informasi produk/item, di mana setiap objek
 * memiliki properti `review` yang merupakan array ulasan dengan `rating`.
 * @param roundingMethod Metode pembulatan:
 * - 'round': Pembulatan ke bilangan bulat terdekat (default).
 * - 'floor': Pembulatan ke bawah.
 * - 'ceil': Pembulatan ke atas.
 * - 'none': Tidak ada pembulatan, akan mempertahankan desimal (jika ada).
 * - 'toFixed': Pembulatan ke jumlah desimal tertentu.
 * @param decimalPlaces Jumlah angka di belakang koma jika roundingMethod 'toFixed'. Default 1.
 * @returns String rata-rata dalam format "X/Y" atau "N/A" jika tidak ada rating yang ditemukan.
 */
export function calculateAverageRating(
    data: {
        name: string;
        id: number;
        review: {
            rating: number;
            content: string;
        }[];
    },
    roundingMethod: 'round' | 'floor' | 'ceil' | 'none' | 'toFixed' = 'round',
    decimalPlaces: number = 1
): string {
    // Kumpulkan semua rating ke dalam satu array datar
    const allRatings: number[] = [];
    data.review.forEach(item => {
        allRatings.push(item.rating);
    });

    if (allRatings.length === 0) {
        return "N/A"; // Tidak ada rating yang ditemukan sama sekali
    }

    const totalRating = allRatings.reduce((sum, currentRating) => sum + currentRating, 0);
    const numberOfRatings = allRatings.length;
    let average = totalRating / numberOfRatings;

    let formattedAverage: string;

    switch (roundingMethod) {
        case 'round':
            formattedAverage = Math.round(average).toString();
            break;
        case 'floor':
            formattedAverage = Math.floor(average).toString();
            break;
        case 'ceil':
            formattedAverage = Math.ceil(average).toString();
            break;
        case 'toFixed':
            formattedAverage = average.toFixed(decimalPlaces);
            break;
        case 'none':
        default:
            formattedAverage = average.toString();
            break;
    }

    return `${formattedAverage}/5`;
}