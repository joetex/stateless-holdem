const StatelessHoldem = require('./service');

const holdem = new StatelessHoldem();

async function run() {


    testGame1();

    // testWin1();

    //holdem.printTotalSize();


}

async function printParams(id) {
    let params = await holdem.getGame(id);
    console.log(JSON.stringify(params, (key, val) => {
        if (Array.isArray(val) && typeof val[0] !== 'object')
            return val.join(',');
        if (key == 'game')
            return '';
        return val;
    }, 2));
}

async function testWin1() {
    await holdem.action(0, 'findwinner', {
        state: {
            table: ['WW', '4D', 'WW', '7D', 'JD'],
            players: {
                "Joel": { cards: ['TD', 'WW'] }
            }
        }
    });
}

async function updateTableCards(id, cards) {
    let game = await holdem.getGame(id);
    game.state.table = cards;
}

async function updatePlayerCards(id, name, cards) {
    let player = await holdem.getplayer(id, name);
    player.cards = cards;
}
async function testGame1() {
    let id = await holdem.newgame();
    //console.log(id);
    await holdem.playerjoin(id, 'Joel', 100)
    await holdem.playerjoin(id, 'Tim', 100)
    await holdem.playerjoin(id, 'Bob', 100)
    await holdem.playerjoin(id, 'Bob2', 100)
    await holdem.playerjoin(id, 'Bob3', 100)
    await holdem.playerjoin(id, 'Bob4', 100)
    await holdem.playerjoin(id, 'Bob5', 100)

    await holdem.newround(id);


    await updatePlayerCards(id, 'Joel', ['7S', 'QD']);
    await updatePlayerCards(id, 'Tim', ['4C', '9H']);
    await updatePlayerCards(id, 'Bob', ['2S', '2C']);
    await updatePlayerCards(id, 'Bob2', ['2H', '6S']);
    await updatePlayerCards(id, 'Bob3', ['TD', 'KS']);
    await updatePlayerCards(id, 'Bob4', ['4S', 'WW']);
    await updatePlayerCards(id, 'Bob5', ['6D', '8D']);

    await holdem.action(id, 'raise/2'); //p1
    await holdem.action(id, 'raise/4'); //p2
    await holdem.action(id, 'fold'); //p3
    await holdem.action(id, 'call'); //p4
    await holdem.action(id, 'call'); //p5
    await holdem.action(id, 'call'); //p6
    await holdem.action(id, 'call'); //p7
    await holdem.action(id, 'call'); //p8
    //await holdem.action(id, 'call');

    await holdem.action(id, 'check');
    await holdem.action(id, 'check');
    await holdem.action(id, 'check');
    await holdem.action(id, 'check');
    await holdem.action(id, 'check');
    await holdem.action(id, 'check');

    await holdem.action(id, 'check');
    await holdem.action(id, 'check');
    await holdem.action(id, 'check');
    await holdem.action(id, 'check');
    await holdem.action(id, 'check');
    await holdem.action(id, 'check');

    await holdem.action(id, 'check');
    await holdem.action(id, 'check');
    await holdem.action(id, 'check');
    await holdem.action(id, 'check');
    await holdem.action(id, 'check');
    updateTableCards(id, ['9S', 'JC', 'KD', '3S', '9D']);

    await holdem.action(id, 'check');

    printParams(id);
}

console.time('Test took');
run();
console.timeEnd('Test took');