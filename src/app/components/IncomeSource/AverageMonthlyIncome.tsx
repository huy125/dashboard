const AverageMonthlyIncome = () => {
    return (
        <div>
            <a className="block p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex flex-col items-center justify-center">
                    <p className="mb-2 text-2xl font-extrabold text-yellow-500">x̄</p>
                    <p className="mb-2 text-4xl">69,079</p>
                    <p className="mb-2 text-xl">Average</p>
                    <p className="mb-2">Monthly Income</p>
                </div>
            </a>
        </div>
    );
}

export default AverageMonthlyIncome;