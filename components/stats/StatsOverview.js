import { useBlocks } from '../../hooks/useBlocks';
import { useNetworkStats } from '../../hooks/useNetworkStats';
import StatisticContainer from './StatisticContainer';

export default function StatsOverview() {
    const { totalBlocks, totalTransactions } = useNetworkStats();
    const { blocks } = useBlocks();

    const getAvgBlockTime = () => {
        // If there are no blocks, defaults to 0 second
        if (blocks.length === 0) return 0;

        // remove null blocks
        const filteredBlocks = blocks.filter((block) => block);

        // remove block with duplicated number
        const blocksWithoutDuplicates = [
            ...new Set(filteredBlocks.map((block) => block.number)),
        ].map((number) =>
            filteredBlocks.find((block) => block.number === number),
        );

        // Get block timestamps, then sort them in ascending order
        const blockTimes = blocksWithoutDuplicates
            .map((block) => ({
                timestamp: parseInt(block.timestamp, 16),
                number: parseInt(block.number, 16),
            }))
            // Sort by number
            .sort((a, b) => b.number - a.number)
            // Filter blocks with number difference not equal to 1
            .filter((block, index, array) => {
                if (index === 0) return true;
                return Math.abs(block.number - array[index - 1].number) == 1;
            })
            // Get block times
            .map((block) => block.timestamp);

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

            <dl className="mt-5 grid grid-cols-1 rounded-lg bg-zinc-900/70 overflow-hidden shadow md:grid-cols-2">
                <StatisticContainer
                    key="total-blocks"
                    data={{
                        title: 'Total blocks',
                        currentStats: totalBlocks,
                        secondaryText: 'blocks',
                    }}
                />
                <StatisticContainer
                    key="total-transactions"
                    data={{
                        title: 'Total transactions',
                        currentStats: totalTransactions?.latest_transactions,
                        previousStats:
                            totalTransactions?.latest_block &&
                            `the first ${totalTransactions.latest_block} blocks`,
                    }}
                />
                <StatisticContainer
                    key="avg-block-time"
                    data={{
                        title: 'Avg. block time',
                        currentStats: getAvgBlockTime(),
                        secondaryText: 'seconds',
                    }}
                />
                <StatisticContainer
                    key="gas-price"
                    data={{
                        title: 'Gas price',
                        currentStats:
                            totalTransactions?.gas_price != null
                                ? totalTransactions?.gas_price / 1000000000
                                : null,
                        secondaryText: 'Gwei',
                    }}
                />
            </dl>
        </div>
    );
}
