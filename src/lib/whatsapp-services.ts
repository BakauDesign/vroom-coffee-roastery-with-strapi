import * as v from 'valibot';
import { SendOrderMessageSchema } from '~/schema/order';

type SendOrderMessage = v.InferInput<typeof SendOrderMessageSchema>;

export function getWhatsAppTemplate(order: SendOrderMessage): string {
    const { 
        buyer_name,
        whatsapp_number,
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

    // Total biaya (termasuk ongkir)
    const totalPayment = (total_cost || 0) + (shipping_data?.cost || 0);

    switch (status) {
        case 'Menunggu Konfirmasi':
        return encodeURIComponent(
            `Halo *${buyer_name}*;\n\n` +
            `Terima kasih sudah memesan di Vroom Coffee!\n\n` +
            ` *Detail Pesanan*\n${productList}\n` +
            ` Ongkir: Rp${shipping_cost.toLocaleString('id-ID')}\n` +
            ` Total: Rp${totalPayment.toLocaleString('id-ID')}\n\n` +
            ` Alamat: \n${address}\n\n` +
            `Instruksi pembayaran menyusul via WhatsApp ini.`
      );

        case 'Menunggu Pembayaran':
        return encodeURIComponent(`Halo *${buyer_name}*!\n\nSilakan bayar *Rp${totalPayment.toLocaleString('id-ID')}* ke:\nBCA 123 888 999 a.n. Vroom Coffee\n\n📋 *Detail Pesanan*\n${productList}\n\n⏰ Batas waktu: 24 jam.`);

        case 'Diproses':
        return `Halo *${buyer_name}* 🚚\n\nPesanan Anda sedang dipacking. Total: Rp${totalPayment.toLocaleString('id-ID')}\n\nKami akan mengirimkan nomor resi segera.`;

        case 'Dikirim':
        return `Halo *${buyer_name}* 🎉\n\nPesanan Anda sudah dikirim!\n📦 *Kurir*: ${shipping_data.name}\n🔢 *Resi*: ${tracking_number}\n💰 *Total*: Rp${totalPayment.toLocaleString('id-ID')}\n\n📍 *Alamat*\n${address}`;

        case 'Selesai':
        return `Halo *${buyer_name}* 🌟\n\nPesanan Anda sudah selesai. Terima kasih telah berbelanja di Vroom Coffee!\n\n✍️ *Beri Ulasan*:\nBagikan pengalaman Anda via WhatsApp ini.`;

        case 'Dibatalkan':
        return `Halo *${buyer_name}* 😔\n\nPesanan Anda dibatalkan karena pembayaran tidak terkonfirmasi.\n\n🔄 *Ingin memesan lagi?*\nBalas pesan ini untuk bantuan.`;

        default:
        throw new Error(`Status pesanan tidak valid: ${status}`);
    }
}