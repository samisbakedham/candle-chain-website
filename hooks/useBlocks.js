import { createContext, useContext, useState } from 'react';
import { API_URL } from '../utils/constants';

const BlocksContext = createContext();

export const BlocksProvider = (props) => {
    const [blocks, setBlocks] = useState([]);
    const [blocksToFetch, setBlocksToFetch] = useState([]);

    const fetchBlockWithNumber = async (number) => {
        // Check if block is already in fetching queue
        if (blocksToFetch.includes(number)) return;

        // Add block to fetching queue
        setBlocksToFetch((prevQueue) => [...prevQueue, number]);

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

            setBlocks((prevBlocks) => [...prevBlocks, block]);

            return block;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchBlockWithHash = async (hash) => {
        // Check if block is already in fetching queue
        if (blocksToFetch.includes(hash)) return;

        // Add block to fetching queue
        setBlocksToFetch((prevQueue) => [...prevQueue, hash]);

        // Fetch block
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_getBlockByHash',
                    params: [hash, true],
                    id: 1,
                }),
            });

            const data = await response.json();
            const block = data.result;

            setBlocks((prevBlocks) => [...prevBlocks, block]);

            return block;
        } catch (error) {
            console.log(error);
        }
    };

    const getBlockWithNumber = async (number) => {
        if (!number) return;

        const block = blocks?.find((block) => block?.number === number);

        console.log('block', block);
        if (block) return block;

        const fetchedBlock = await fetchBlockWithNumber(number);
        console.log('fetchedBlock', fetchedBlock);

        return fetchedBlock;
    };

    const getBlockWithHash = async (hash) => {
        if (!hash) return;

        const block = blocks?.find((block) => block?.hash === hash);

        if (block) return block;

        const fetchedBlock = await fetchBlockWithHash(hash);
        return fetchedBlock;
    };

    const values = {
        blocks,

        getBlockWithNumber,
        getBlockWithHash,
    };

    return <BlocksContext.Provider value={values} {...props} />;
};

export const useBlocks = () => {
    const context = useContext(BlocksContext);

    if (context === undefined)
        throw new Error(`useBlocks() must be used within a BlocksProvider.`);

    return context;
};
