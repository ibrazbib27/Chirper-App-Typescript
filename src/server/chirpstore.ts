import * as fs from 'fs';
let chirps: any = { nextid: 0 };

if(fs.existsSync('chirps.json')) {
    chirps = JSON.parse( fs.readFileSync('chirps.json').toString());

}

let getChirps = () => {
    return (<any>Object).assign({}, chirps); //create a copy and return it
}

let getChirp = (id: string) => {
    return (<any>Object).assign({}, chirps[parseInt(id)]); //create a copy and return it
}

let createChirp = (chirp: any) => {
    chirps[chirps.nextid++] = chirp;
    writeChirps();
};

let updateChirp = (id: string, chirp: any) => {
    chirps[parseInt(id)] = chirp;
    writeChirps();
}

let deleteChirp = (id: string) => {
    delete chirps[parseInt(id)];
    writeChirps();
}

let writeChirps = () => {
    fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

export = {
    CreateChirp: createChirp,
    DeleteChirp: deleteChirp,
    GetChirps: getChirps,
    GetChirp: getChirp,
    UpdateChirp: updateChirp
}