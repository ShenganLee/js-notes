const sleep = (time) => {
    return new Promise((resolve) => setTimeout(() => resolve(), time));
};

const grayTask = async () => {
    let i = 0;
    for (; true; ) {
        console.log(i);
        await sleep(10 * 1000);
        i++;
    }
};

function test() {
    grayTask()

    setInterval(() => {
        console.log(Date.now())
    }, 5 * 1000)
}

test()
