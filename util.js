// util.js

const doSomeHeavytask = () => {
    return new Promise((resolve, reject) => {
        console.log("Starting heavy task...");

        // Simulate processing delay
        setTimeout(() => {
            const randomErrorChance = Math.random();

            if (randomErrorChance < 0.3) { // 30% chance of error
                console.log("Error occurred during heavy task.");
                reject(new Error("An error occurred during the heavy task"));
            } else {
                // Simulate a heavy calculation
                let result = 0;
                for (let i = 0; i < 1e8; i++) {
                    result += i;
                }

                console.log("Heavy task completed.");
                resolve(result);
            }
        }, 1000); // Delay of 1 second to simulate async processing
    });
};

module.exports = { doSomeHeavytask };
