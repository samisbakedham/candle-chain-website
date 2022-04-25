import { createClient } from '@supabase/supabase-js';
import { API_URL } from '../../../utils/constants';

const handler = async (req, res) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !serviceKey) {
        res.status(500).json({
            error: 'Missing SUPABASE_SERVICE_KEY or SUPABASE_SERVICE_KEY environment variables',
        });

        return;
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    switch (req.method) {
        case 'POST':
            await generateBlocks(supabase, req, res);
            break;

        default:
            res.status(405).json({
                error: 'Method not allowed',
            });
            break;
    }
};

const generateBlocks = async (supabase, req, res) => {
    try {
        const { data: overviewData, error: overviewError } = await supabase
            .from('chain-overview')
            .select('*')
            .single();

        if (overviewError)
            return res.status(500).json({
                error: 'Error fetching chain overview',
            });

        if (!overviewData)
            return res.status(500).json({
                error: 'Chain overview not found',
            });

        const { latest_block, latest_transactions } = overviewData;

        const blocks = [];

        // fetch the next 10 blocks
        for (let i = latest_block + 1; i <= latest_block + 10; i++) {
            const hexNumber = `0x${i.toString(16)}`;

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_getBlockByNumber',
                    params: [hexNumber, true],
                    id: 1,
                }),
            });

            const data = await response.json();
            const block = data.result;

            blocks.push(block);
        }

        const promises = blocks.map(async (block) => {
            const { data, error } = await supabase
                .from('blocks')
                .insert({
                    number: parseInt(block.number, 16),
                    hash: block.hash,
                    transaction_count: block.transactions.length,
                })
                .single();

            if (error)
                return res.status(500).json({
                    error: error.message,
                });

            return data;
        });

        const results = await Promise.all(promises);
        const totalTransactions = results.reduce(
            (acc, block) => acc + block.transaction_count,
            0,
        );

        const { data, error: newChainOverviewError } = await supabase
            .from('chain-overview')
            .update({
                latest_block: latest_block + 10,
                latest_transactions: latest_transactions + totalTransactions,
            })
            .eq('id', '014df7e4-b6b7-4398-b4e9-a2fab08712fa')
            .single();

        if (newChainOverviewError)
            return res.status(500).json({
                error: newChainOverviewError.message,
            });

        return res.status(200).json({
            data,
        });
    } catch (error) {
        console.log(error);
    }
};

export default handler;
