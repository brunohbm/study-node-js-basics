setTimeout(console.log, 0, 'setTimeout');

const teste = async () => {
    const value = await new Promise((resolve, reject) => {
        resolve(10);
        [0,2,3,4,5,6,7,8,9,10].forEach(value => {
            console.log(value);
        })
    });

    console.log({value});
};

teste();

console.log('console');