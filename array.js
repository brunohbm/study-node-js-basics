const teste = [0,1,2];

const execute = async () => {
    const arrayOfPromisses = teste.map(t => new Promise(resolve => {
        setTimeout(resolve, 1000, t)
    }));

    for await (let request of arrayOfPromisses) {
        const data = await request;
        console.log(data);
    }
}

execute();