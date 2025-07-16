import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import Chart from 'chart.js/auto';
import { formatRupiah } from '~/lib/utils';
import { Dropdown } from '../dropdown';
import { useLocation, useNavigate } from '@builder.io/qwik-city';

interface SalesData {
    month: string;
    sales: number;
    revenue: number;
}

interface AnnualSalesChartProps {
    salesData: SalesData[];
    suggestedMaxSales: number;
    selectedYear: string;
    availableYears: string[];
}

export const AnnualSalesChart = component$((props: AnnualSalesChartProps) => {
    const canvasRef = useSignal<HTMLCanvasElement>();
    const chartInstance = useSignal<Chart | null>(null);

    const nav = useNavigate();
    const loc = useLocation();
    const currentSearchParams = new URLSearchParams(loc.url.searchParams);

    useVisibleTask$(({ track }) => {
        track(() => props.salesData);
        track(() => props.suggestedMaxSales);
        track(() => props.selectedYear);

        const labels = props.salesData.map(d => d.month);
        const dataValues = props.salesData.map(d => d.sales);

        // Hancurkan instance chart yang lama jika ada sebelum membuat yang baru
        if (chartInstance.value) {
            chartInstance.value.destroy();
        }

        // Inisialisasi atau perbarui Chart.js
        if (canvasRef.value) {
            const ctx = canvasRef.value.getContext('2d');
            if (ctx) {
                chartInstance.value = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Jumlah Penjualan Kopi',
                                data: dataValues,
                                backgroundColor: '#A7F3D0',
                                borderRadius: 8,
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Jumlah Penjualan'
                                },
                                // Gunakan suggestedMaxSales dari props
                                suggestedMax: props.suggestedMaxSales,
                                ticks: {
                                    stepSize: 1
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Bulan'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            title: {
                                display: true,
                                // Gunakan selectedYear dari props
                                text: `Statistik penjualan Januari - Desember ${props.selectedYear}`
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const index = context.dataIndex;
                                        // Akses data dari props.salesData
                                        const monthData = props.salesData[index];

                                        if (monthData) {
                                            return [
                                                `Penjualan: ${monthData.sales.toLocaleString('id-ID')} unit`,
                                                `Pendapatan: ${formatRupiah(monthData.revenue)}`
                                            ];
                                        }
                                        return '';
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    });

    return (
        <div class="p-6 rounded-[6px] bg-neutral-custom-base shadow-[4px_4px_16px_0px_rgba(204,204,204,0.10)] border-[1.5px] border-solid border-neutral-custom-100">
            <section class="flex flex-col gap-6 font-inter">
                <article class="flex flex-col gap-y-3">
                    <h1 class="text-cms-h3-medium font-medium text-neutral-custom-800">
                        Penjualan Kopi Tahunan
                    </h1>

                    <h2 class="text-cms-label-small font-medium text-neutral-custom-800">
                        Statistik penjualan Januari - Desember {props.selectedYear}
                    </h2>
                </article>

                <Dropdown.Root
                    variant='option'
                    currentValue={props.selectedYear}
                    position='floating'
                    class="self-end"

                    onClickOption$={(value) => {
                        currentSearchParams.set('year', value);
                        nav(`${loc.url.pathname}?${currentSearchParams.toString()}`, { replaceState: true });
                    }}
                >
                    <Dropdown.Label>
                        <p>{props.selectedYear}</p>
                    </Dropdown.Label>

                    <Dropdown.Items class="absolute">
                        {props.availableYears.map((year) => (
                            <Dropdown.Item value={year}>
                                {year}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Items>
                </Dropdown.Root>
            </section>

            <section class="overflow-scroll no-scrollbar">
                <div class="relative" style={{ height: '400px', minWidth: '400px' }}>
                    <canvas ref={canvasRef} />
                </div>
            </section>
        </div>
    );
});