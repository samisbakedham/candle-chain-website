import { useNetworkStats } from '../../hooks/useNetworkStats';
import StatisticContainer from './StatisticContainer';

export default function StatsOverview() {
    const { totalBlocks, totalTransactions, avgBlockTime } = useNetworkStats();

    return (
        <div>
            <h3 className="text-lg leading-6 font-medium text-gray-100">
                Overview
            </h3>

            <dl className="mt-5 grid grid-cols-1 rounded-lg bg-zinc-800/70 overflow-hidden shadow divide-y divide-gray-700/50 md:grid-cols-3 md:divide-y-0 md:divide-x">
                <StatisticContainer
                    key="total-blocks"
                    data={{
                        title: 'Total blocks',
                        currentStats: totalBlocks,
                    }}
                />
                <StatisticContainer
                    key="total-transactions"
                    data={{
                        title: 'Total transactions',
                        currentStats: totalTransactions,
                    }}
                />
                <StatisticContainer
                    key="avg-block-time"
                    data={{
                        title: 'Avg. block time',
                        currentStats: avgBlockTime,
                    }}
                />
            </dl>
        </div>
    );
}
