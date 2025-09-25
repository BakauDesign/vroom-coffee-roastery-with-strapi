export interface Users {
    id: number;
    name: string;
    username: string;
    role: string;
    avatar: string;
    password: string;
}

export interface Products {
    id: string;
    slug: string;
    informasi_produk: ProductInformation;
    daftar_varian_kemasan?: Array<PackageVariant> | null;
}

export interface ProductInformation {
    nama: string;
    deskripsi: string;
    highlight: string | null;
    aktif: boolean;
    highlighted: boolean;
    foto: { url: string; };
}

export type PackageVariant = {
    documentId: number;
    kemasan: string;
    harga: string;
    diskon: number;
    harga_diskon: string;
    stok: number;
    berat: string;
}

export interface ServingRecommendation {
    id: number;
    nama: string;
    deskripsi: string;
}

export interface RoastedBeansProduct {
    documentId: string;
    informasi_produk: ProductInformation;
    daftar_varian_kemasan: Array<PackageVariant>;
    daftar_rekomendasi_penyajian: Array<ServingRecommendation>;
    asal: string;
    proses: string;
    catatan_tes: string;
    kemasan: string;
    slug: string;
}

export interface RoastedBeansProductWithReviews extends RoastedBeansProduct {
    ulasan_produk_roasted_beans: Array<{
        createdAt: string;
        informasi_ulasan: {
            id: number;
            nama: string;
            lokasi: string;
            rating: number;
            konten: string;
            tampilkan: boolean;
        }
    }>;
}

export interface GreenBeansProductWithReviews extends GreenBeansProduct {
    ulasan_produk_green_beans: Array<{
        createdAt: string;
        informasi_ulasan: {
            id: number;
            nama: string;
            lokasi: string;
            rating: number;
            konten: string;
            tampilkan: boolean;
        }
    }>;
}

export interface ToolsProductWithReviews extends ToolsProduct {
    ulasan_produk_tools: Array<Review>;
}

export interface GreenBeansProduct {
    documentId: string;
    informasi_produk: ProductInformation;
    asal: string;
    ketinggian: number;
    proses: string;
    varietas: string;
    kadar_air: number;
    densitas: number;
    cacat: string;
    ukuran_lubang_saringan: string;
    level_roast: string;
    deskripsi_rasa: string;
    aktivitas_air: number;
    quaker: number;
    potensi_cupping: number;
    slug: string;
}

export interface ToolsProduct {
    documentId: string;
    informasi_produk: ProductInformation;
    material: string;
    kapasitas: string;
    dimensi: string;
    kompatibilitas: string;
    pengaturan: string;
    aksesoris: string;
    kemasan: string;
    harga: string;
    diskon: number;
    harga_diskon: string;
    stok: number;
    berat: string;
    daftar_fitur_utama: Array<{
        emoji: string;
        nama: string;
        deskripsi: string;
    }>;
    slug: string;
}

export interface Review {
    documentId: string;
    createdAt: string;
    informasi_ulasan: {
        id: number;
        nama: string;
        lokasi: string;
        rating: number;
        konten: string;
        tampilkan: boolean;
    }
}

export interface Shipping {
    documentId: string;
    nama: string;
    logo: { url: string; };
    biaya: string;
    aktif: boolean;
}