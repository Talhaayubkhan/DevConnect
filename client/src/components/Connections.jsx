import useShowConnections from "../hooks/useShowConnections";

const Connections = () => {
  const { showCurrentConnections } = useShowConnections();

  if (!showCurrentConnections)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );

  if (showCurrentConnections.length === 0)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <h1 className="text-red-600 text-3xl font-semibold">
          No Connections Found!
        </h1>
      </div>
    );

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">
        Your Connections
      </h1>

      <div className="space-y-6 mb-20">
        {showCurrentConnections.map((connection) => {
          const { _id, firstName, lastName, photoURL, age, about, gender } =
            connection;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center bg-base-100 shadow-md rounded-2xl border border-gray-700 p-4 gap-4"
            >
              <img
                src={photoURL || "https://via.placeholder.com/150"}
                alt={`${firstName}'s profile`}
                className="w-24 h-24 object-cover rounded-full border-4 border-primary"
              />

              <div className="flex-1 text-center sm:text-left space-y-2">
                <h2 className="text-xl font-bold text-white capitalize">
                  {firstName} {lastName}
                  <span className="ml-2 badge badge-secondary">Connected</span>
                </h2>
                <p className="text-sm text-white font-semibold">{about}</p>
                <div className="text-sm">
                  <p>
                    <span className="font-medium text-primary">Gender:</span>{" "}
                    {gender}
                  </p>
                  <p>
                    <span className="font-medium text-primary">Age:</span>{" "}
                    {age || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
