export default function BlockOverview({ block }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "mined":
        return "bg-green-500/20 text-green-300";

      case "processing":
        return "bg-yellow-500/20 text-yellow-300";

      case "failed":
        return "bg-red-500/20 text-red-300";

      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <li
      key={block?.email}
      className="col-span-1 bg-zinc-800/70 rounded-lg shadow divide-gray-700/50"
    >
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-gray-100 text-sm font-semibold truncate">
              {block?.id}
            </h3>
            <span
              className={`capitalize flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                block?.status
              )}`}
            >
              {block?.status}
            </span>
          </div>
          <div className="mt-4 text-indigo-200 text-xs truncate">
            {"Recorded at " +
              new Date(block?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",

                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
          </div>
          <p className="mt-1 text-indigo-300 text-sm truncate">
            <span className="font-medium text-gray-400">By </span>
            {block?.miner}
          </p>
        </div>
      </div>
    </li>
  );
}
