import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";

const stats = [
  {
    name: "Total Blocks",
    stat: "1,000,273",
    previousStat: "97,367",
    change: "1,029%",
    changeType: "increase",
  },
  {
    name: "Avg. block time",
    stat: "2s",
    previousStat: "5s",
    change: "250%",
    changeType: "increase",
  },
  {
    name: "Total Transactions",
    stat: "21",
    previousStat: "5",
    change: "420%",
    changeType: "increase",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StatsOverview() {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-100">
        Last 30 days
      </h3>

      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-zinc-800/70 overflow-hidden shadow divide-y divide-gray-700/50 md:grid-cols-3 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-semibold text-gray-100">
              {item.name}
            </dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-300">
                {item.stat}
                <span className="ml-2 text-sm font-medium text-gray-300">
                  from {item.previousStat}
                </span>
              </div>

              <div
                className={classNames(
                  item.changeType === "increase"
                    ? "bg-green-500/20 text-green-300"
                    : "bg-red-500/20 text-red-300",
                  "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowSmUpIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {item.changeType === "increase" ? "Increased" : "Decreased"}{" "}
                  by
                </span>
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
