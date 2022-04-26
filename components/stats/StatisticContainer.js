import CircularLoadingIndicator from '../loaders/CircularLoadingIndicator';

export default function StatisticContainer({ data, buttonLabel, onClick }) {
    return (
        <div key={data.title} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-semibold text-gray-100">
                {data.title}{' '}
                {onClick && (
                    <span>
                        <button
                            className="ml-2 px-2 py-0.5 rounded-lg bg-indigo-500/30 hover:bg-indigo-400/30 text-indigo-300 transition duration-300"
                            onClick={onClick}
                        >
                            {buttonLabel ?? 'Button'}
                        </button>
                    </span>
                )}
            </dt>

            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                {data?.currentStats ? (
                    <div className="flex items-baseline text-2xl font-semibold text-indigo-300">
                        {data?.currentStats}
                        {(data?.secondaryText || data?.previousStats) && (
                            <span className="ml-2 text-sm font-medium text-gray-300">
                                {data?.secondaryText ||
                                    'from ' + data?.previousStats}
                            </span>
                        )}
                    </div>
                ) : (
                    <CircularLoadingIndicator className="w-8 h-8" />
                )}
            </dd>
        </div>
    );
}
