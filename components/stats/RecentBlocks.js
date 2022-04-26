import { useNetworkStats } from '../../hooks/useNetworkStats';
import BlockOverview from './BlockOverview';

export default function RecentBlocks() {
    const { loading, totalBlocks } = useNetworkStats();
    const blocksToDisplay = 9;

    const generateRecentBlocks = () => {
        if (!totalBlocks || totalBlocks.length == 0)
            return (
                <div className="col-span-full">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold">
                                No blocks found
                            </h1>
                            <p className="text-lg">
                                There are no blocks found in the network.
                            </p>
                        </div>
                    </div>
                </div>
            );

        const recentBlocks = [];

        for (
            let i = totalBlocks;
            i > totalBlocks - blocksToDisplay && i > 0;
            i--
        ) {
            const blockNumber = i;

            const block = (
                <BlockOverview key={blockNumber} number={blockNumber} />
            );

            recentBlocks.push(block);
        }

        return recentBlocks;
    };

    return (
        <div>
            <h3 className="my-4 text-lg leading-6 font-medium text-gray-100">
                Recent Blocks
            </h3>

            <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {loading || generateRecentBlocks()}
            </ul>
        </div>
    );
}
