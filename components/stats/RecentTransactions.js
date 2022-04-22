import TransactionOverview from "./TransactionOverview";

const transactions = [
  {
    id: 1001351,
    from: "0x0000000000000000000000000000000000000000",
    to: "0x0000000000000000000000000000000000000000",
    value: "0x0",
    status: "success",
    createdAt: "2020-05-06T13:00:00.000Z",
    error: null,
    type: "contract-call",
  },
  {
    id: 1001350,
    from: "0x0000000000000000000000000000000000000000",
    to: "0x0000000000000000000000000000000000000000",
    value: "0x0",
    status: "processing",
    createdAt: "2020-05-06T12:00:00.000Z",
    error: "Awaiting internal transactions for reason",
    type: "contract-call",
  },
  {
    id: 1001349,
    from: "0x0000000000000000000000000000000000000000",
    to: "0x0000000000000000000000000000000000000000",
    value: "0x0",
    status: "success",
    createdAt: "2020-05-06T11:00:00.000Z",
    error: null,
    type: "contract-call",
  },
  {
    id: 1001348,
    from: "0x0000000000000000000000000000000000000000",
    to: "0x0000000000000000000000000000000000000000",
    value: "0x0",
    status: "failed",
    createdAt: "2020-05-06T10:00:00.000Z",
    error: "Awaiting internal transactions for reason",
    type: "contract-call",
  },
  {
    id: 1001347,
    from: "0x0000000000000000000000000000000000000000",
    to: "0x0000000000000000000000000000000000000000",
    value: "0x0",
    status: "success",
    createdAt: "2020-05-06T09:00:00.000Z",
    error: null,
    type: "token-transfer",
  },
];

export default function RecentTransactions() {
  return (
    <div>
      <h3 className="my-4 text-lg leading-6 font-medium text-gray-100">
        Recent Transactions
      </h3>

      <ul role="list" className="grid grid-cols-1 gap-6">
        {transactions.map((transaction) => (
          <TransactionOverview key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
}
