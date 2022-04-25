import { useBlocks } from '../../hooks/useBlocks';
import { useNetworkStats } from '../../hooks/useNetworkStats';
import StatisticContainer from './StatisticContainer';

export default function StatsOverview() {
    const { totalBlocks, totalTransactions } = useNetworkStats();
    const { blocks } = useBlocks();

    const getAvgBlockTime = () => {
        // If there are no blocks, defaults to 0 second
        if (blocks.length === 0) return 0;

        // remove block with duplicated number
        const blocksWithoutDuplicates = blocks.filter(
            (block, index, self) =>
                index === self.findIndex((t) => t.number === block.number),
        );

        // Get block timestamps, then sort them in ascending order
        const blockTimes = blocksWithoutDuplicates
            .map((block) => block.timestamp)
            .sort((a, b) => a - b);

        // Calculate the average block time based on block timestamp differences
        // Between current block and previous block
        const totalAvgBlockTime = blockTimes.reduce((acc, _, index) => {
            if (index === 0) return 0;
            return acc + Math.abs(blockTimes[index] - blockTimes[index - 1]);
        }, 0);

        const avgBlockTime = (
            totalAvgBlockTime /
            (blockTimes.length - 1)
        ).toFixed(6);

        return avgBlockTime > 0 ? avgBlockTime : 0;
    };

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
                        currentStats: `${getAvgBlockTime()}s`,
                    }}
                />
            </dl>
        </div>
    );
}
