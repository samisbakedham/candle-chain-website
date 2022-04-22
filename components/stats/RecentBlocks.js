import BlockOverview from "./BlockOverview";

const blocks = [
  {
    id: 1001351,
    transactions: 0,
    createdAt: "2020-05-06T13:00:00.000Z",
    miner: "0x0000000000000000000000000000000000000000",
    difficulty: "0x0",
    status: "mined",
  },
  {
    id: 1001350,
    transactions: 0,
    createdAt: "2020-05-06T12:00:00.000Z",
    miner: "0x0000000000000000000000000000000000000000",
    difficulty: "0x0",
    status: "mined",
  },
  {
    id: 1001349,
    transactions: 0,
    createdAt: "2020-05-06T11:00:00.000Z",
    miner: "0x0000000000000000000000000000000000000000",
    difficulty: "0x0",
    status: "processing",
  },
  {
    id: 1001348,
    transactions: 0,
    createdAt: "2020-05-06T10:00:00.000Z",
    miner: "0x0000000000000000000000000000000000000000",
    difficulty: "0x0",
    status: "mined",
  },
  {
    id: 1001347,
    transactions: 0,
    createdAt: "2020-05-06T09:00:00.000Z",
    miner: "0x0000000000000000000000000000000000000000",
    difficulty: "0x0",
    status: "failed",
  },
  {
    id: 1001346,
    transactions: 0,
    createdAt: "2020-05-06T08:00:00.000Z",
    miner: "0x0000000000000000000000000000000000000000",
    difficulty: "0x0",
    status: "invalid",
  },
];

export default function RecentBlocks() {
  return (
    <div>
      <h3 className="my-4 text-lg leading-6 font-medium text-gray-100">
        Recent Blocks
      </h3>

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {blocks.map((block) => (
          <BlockOverview key={block.id} block={block} />
        ))}
      </ul>
    </div>
  );
}
