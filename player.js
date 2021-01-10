const redis = require('redis');
client = redis.createClient();

const { promisify } = require('util');
const hsetAsync = promisify(client.hset).bind(client);
const incrbyAsync = promisify(client.incrby).bind(client);
const hincrbyAsync = promisify(client.hincrby).bind(client);
const zadd = promisify(client.zadd).bind(client);

const redisKeys = {
    playerID: 'playerID',
    numSamples: 'numSamples',
    sum: 'sum',
    average: 'average',
    scoreboard: 'scoreboard',
};

async function sleep_ms(duration_ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, duration_ms);
    });
}

function chooseNumber() {
    return 1 + Math.floor(Math.random() * 10);
}

async function play() {
    // Increment the playerID value to retrieve our ID
    let id = await incrbyAsync(redisKeys.playerID, 1);

    let numSamples, sum;
    while (true) {
        // Increment sample count
        numSamples = await hincrbyAsync(id, redisKeys.numSamples, 1);

        // Choose a random number and add it to sum
        sum = await hincrbyAsync(id, redisKeys.sum, chooseNumber());

        // Update the scoreboard with our average
        await zadd(redisKeys.scoreboard, sum / numSamples, id);

        // Sleep 1 second
        await sleep_ms(1000);
    }
}

play().then(() => {});
