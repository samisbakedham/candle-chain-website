import { useEffect, useState } from 'react';
import { useBlocks } from '../../hooks/useBlocks';
import { API_URL } from '../../utils/constants';

export default function BlockOverview({ number }) {
    const { addBlock } = useBlocks();

    const [loading, setLoading] = useState(true);
    const [block, setBlock] = useState(null);

    useEffect(() => {
        const fetchBlockWithNumber = async (number) => {
            if (!number) {
                console.log('No block number provided');
                return;
            }

            // If number is not a hexadecimal, convert it to one
            if (!number.toString().match(/^0x[0-9a-fA-F]{64}$/))
                number = `0x${number.toString(16)}`;

            // Fetch block
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        method: 'eth_getBlockByNumber',
                        params: [number, true],
                        id: 1,
                    }),
                });

                const data = await response.json();
                const block = data.result;
                if (!block) return;

                // Add block to list
                addBlock(block);

                setBlock(block);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlockWithNumber(number);
    }, [number, addBlock]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'mined':
                return 'bg-green-500/20 text-green-300';

            case 'processing':
                return 'bg-yellow-500/20 text-yellow-300';

            case 'failed':
                return 'bg-red-500/20 text-red-300';

            default:
                return 'bg-gray-500/20 text-gray-300';
        }
    };

    const getRelativeTime = (timestamp) => {
        if (!timestamp) return '-';

        const now = Date.now();
        const diff = now - new Date(timestamp * 1000);

        if (diff < 1000) return 'just now';

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (seconds < 60) return `${seconds} seconds ago`;

        if (minutes < 60) return `${minutes} minutes ago`;

        if (hours < 24) return `${hours} hours ago`;

        if (days < 30) return `${days} days ago`;

        if (months < 12) return `${months} months ago`;

        return `${years} years ago`;
    };

    return (
        <li
            key={block?.hash}
            className="col-span-1 bg-zinc-800/70 rounded-lg shadow divide-gray-700/50"
        >
            <div
                className={`w-full flex items-center justify-between p-6 space-x-6
                ${loading ? 'opacity-50' : 'opacity-100'}`}
            >
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="text-blue-300 text-sm font-semibold truncate">
                            #{parseInt(block?.number, 16) || number}{' '}
                            <span className="text-gray-100">
                                ({block?.number ?? `0x${number.toString(16)}`})
                            </span>
                        </h3>
                        <span
                            className={`capitalize flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                                loading ? 'processing' : 'mined',
                            )}`}
                        >
                            {loading ? 'processing' : 'mined'}
                        </span>
                    </div>
                    <p className="mt-1 text-indigo-300 text-sm truncate">
                        <span className="font-medium text-gray-400">
                            Transactions:{' '}
                        </span>
                        {block?.transactions.length || 0}
                    </p>

                    <div className="capitalize mt-4 text-indigo-200 text-xs truncate">
                        {getRelativeTime(block?.timestamp)}
                    </div>
                    <p className="mt-1 text-blue-300 font-semibold text-xs truncate">
                        <span className="font-medium text-gray-400">
                            Mined by{' '}
                        </span>
                        {block?.miner || 'Unknown'}
                    </p>

                    <p className="mt-4 px-4 py-2 rounded-lg bg-green-500/10 text-green-300 text-sm truncate">
                        <span className="font-medium">Gas used: </span>
                        {parseInt(block?.gasUsed, 16) || 0}
                    </p>

                    <p className="mt-2 px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-300 text-sm truncate">
                        <span className="font-medium">Gas limit: </span>
                        {parseInt(block?.gasLimit, 16) || 0}
                    </p>
                </div>
            </div>
        </li>
    );
}
