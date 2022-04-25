// import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';

export default function StatisticContainer({ data, buttonLabel, onClick }) {
    // function classNames(...classes) {
    //     return classes.filter(Boolean).join(' ');
    // }

    return (
        <div key={data.title} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-semibold text-gray-100">
                {data.title}{' '}
                {onClick && (
                    <span>
                        <button className="ml-2 px-2 py-0.5 rounded-lg bg-indigo-500/30 hover:bg-indigo-400/30 text-indigo-300 transition duration-300">
                            {buttonLabel ?? 'Button'}
                        </button>
                    </span>
                )}
            </dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-indigo-300">
                    {data.currentStats}
                    {data.previousStats && (
                        <span className="ml-2 text-sm font-medium text-gray-300">
                            from {data.previousStats}
                        </span>
                    )}
                </div>

                {/* <div
                    className={classNames(
                        data.trend === 'increase'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-red-500/20 text-red-300',
                        'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0',
                    )}
                >
                    {data.trend === 'increase' ? (
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
                        {data.trend === 'increase' ? 'Increased' : 'Decreased'}{' '}
                        by
                    </span>
                    {data?.currentStats && data?.previousStats
                        ? ((data.currentStats - data.previousStats) /
                              data.previousStats) *
                          100
                        : 0}
                </div> */}
            </dd>
        </div>
    );
}
