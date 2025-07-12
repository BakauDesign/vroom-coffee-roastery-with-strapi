import * as v from 'valibot';
import { SendOrderMessageSchema } from '~/schema/order';

type SendOrderMessage = v.InferInput<typeof SendOrderMessageSchema>;

export function getWhatsAppTemplate(order: SendOrderMessage): string {
    const {
        buyer_name,
        status,
        purchasedProduct,
        total_cost,
        shipping_cost,
        shipping_data,
        tracking_number,
        address
    } = order;

    // Format daftar produk
    const productList = purchasedProduct.map(
        item => `- ${item.name} (${item.type}) x${item.quantity}: Rp${item.price.toLocaleString('id-ID')}`
    ).join('\n');

    const totalPayment = (total_cost || 0) + (shipping_data?.cost || 0);

    switch (status) {
        case 'Menunggu Konfirmasi':
            return encodeURIComponent(
                `Halo *${buyer_name}*;\n\n` +
                `Terima kasih sudah memesan di Vroom Coffee!\n\n` +
                `*Detail Pesanan*\n${productList}\n` +
                `Ongkir: Rp${shipping_cost.toLocaleString('id-ID')}\n` +
                `Total: Rp${totalPayment.toLocaleString('id-ID')}\n\n` +
                `Alamat:\n${address}\n\n` +
                `Instruksi pembayaran menyusul via WhatsApp ini.`
            );

        case 'Menunggu Pembayaran':
            return encodeURIComponent(
                `Halo *${buyer_name}*!\n\n` +
                `Silakan bayar *Rp${totalPayment.toLocaleString('id-ID')}* ke:\n` +
                `BCA 123 888 999 a.n. Vroom Coffee\n\n` +
                `*Detail Pesanan*\n${productList}\n\n` +
                `Batas waktu: 24 jam.`
            );

        case 'Diproses':
            // Pastikan Anda juga menambahkan `encodeURIComponent`
            return encodeURIComponent(
                `Halo *${buyer_name}*\n\n` +
                `Pesanan Anda sedang dipacking. Total: Rp${totalPayment.toLocaleString('id-ID')}\n\n` +
                `Kami akan mengirimkan nomor resi segera.`
            );

        case 'Dikirim':
            // Pastikan Anda juga menambahkan `encodeURIComponent`
            // Tambahkan pengecekan null/undefined untuk shipping_data dan tracking_number jika memungkinkan mereka kosong
            const courierName = shipping_data?.name || 'Tidak diketahui';
            const resiNumber = tracking_number || 'Belum tersedia';

            return encodeURIComponent(
                `Halo *${buyer_name}*\n\n` +
                `Pesanan Anda sudah dikirim!\n` +
                `*Kurir*: ${courierName}\n` +
                `*Resi*: ${resiNumber}\n` +
                `*Total*: Rp${totalPayment.toLocaleString('id-ID')}\n\n` +
                `*Alamat*\n${address}`
            );

        case 'Selesai':
            // Pastikan Anda juga menambahkan `encodeURIComponent`
            return encodeURIComponent(
                `Halo *${buyer_name}*\n\n` +
                `Pesanan Anda sudah selesai. Terima kasih telah berbelanja di Vroom Coffee!\n\n` +
                `*Beri Ulasan*:\n` +
                `Bagikan pengalaman Anda via WhatsApp ini.`
            );

        case 'Dibatalkan':
            // Pastikan Anda juga menambahkan `encodeURIComponent`
            return encodeURIComponent(
                `Halo *${buyer_name}*\n\n` +
                `Pesanan Anda dibatalkan karena pembayaran tidak terkonfirmasi.\n\n` +
                `*Ingin memesan lagi?*\n` +
                `Balas pesan ini untuk bantuan.`
            );

        default:
            throw new Error(`Status pesanan tidak valid: ${status}`);
    }
}