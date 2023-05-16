import { symbolWeights } from './odds.js'
import { payouts } from './payouts.js'

const NUM_SYMBOLS = 72;
var credits = 1000;
let creditsWon = 0;
let creditsLost = 0;
var BET = 3;
let reel1 = []
let reel2 = []
let reel3 = []
var spins = 0;

function initReels(reel1, reel2, reel3) {
  for(let key in symbolWeights) {
    for(let i = 0; i < symbolWeights[key].reel1; i++) {
      reel1.push(key)
    }
    for(let i = 0; i < symbolWeights[key].reel2; i++) {
      reel2.push(key)
    }
    for(let i = 0; i < symbolWeights[key].reel3; i++) {
      reel3.push(key)
    }
    // debug(symbolWeights, key)
  }
}

function randomIndex() {
  return Math.floor(Math.random()*72);
}

async function spin(credits) {
  let result = `${reel1[randomIndex()]}${reel2[randomIndex()]}${reel3[randomIndex()]}`
  // console.log(result)
  let payout = payouts[result]
  if(payout) {
    payout = payout[BET - 1]
    // console.log(`${result} PAYS ${payout}`)
    credits += payout
    // console.log(`credits: ${credits}`)
    creditsWon += payout
    await sleep(1000)
    return payout
  } else {
    creditsLost += BET
    return 0
  }
}


initReels(reel1, reel2, reel3)

// terminal()
// while(credits > 2) {
//   credits -= BET;
//   credits += spin(credits)
//   spins++
// }

// terminal()

let simulations = [1_000, 10_000, 100_000, 1_000_000, 10_000_000]

for(let i = 0; i < simulations.length; i++) {
  console.time(`time${i}`)
  simulateSpins(simulations[i])
  console.timeEnd(`time${i}`)
  console.log(`spins: ${simulations[i]}`)
  console.log(`credits won: ${creditsWon}`)
  console.log(`credits lost: ${creditsLost}`)
  console.log(`%: ${(creditsWon / creditsLost) * 100}%`)
  console.log('---------------------------')
}

// console.time('time')
// simulateSpins(1_000_000)
// console.timeEnd('time')
// console.log(`spins: ${spins}`)
// console.log(`credits won: ${creditsWon}`)
// console.log(`credits lost: ${creditsLost}`)
// console.log(`%: ${(creditsWon / creditsLost) * 100}%`)

// spin(credits)

// console.log(`spins: ${spins}`)


function simulateSpins(numberOfSpins) {
  for(let i = 0; i < numberOfSpins; i++) {
    credits -= BET;
    credits += spin(credits)
    spins++
  }
}

function terminal() {
  let stdin = process.stdin
  stdin.setRawMode(true)
  stdin.resume()
  stdin.setEncoding('utf8')
  console.log('press j to spin, k to increase bet, l to decrease bet, ctrl-c to exit')
  stdin.on('data', async function(key){
    if(credits === 0) {
      console.log('you are out of credits.... way she goes!')
      process.exit()
    }
    if (key === 'j') {
      credits -= BET;
      credits += await spin(credits)
      spins++
      console.log(`credits: ${credits} BET: ${BET}`)
    } else if (key === 'k') {
      if(BET < 3) {
        BET++
        console.log(`BET: ${BET}`)
      }
    } else if (key === 'l') {
      if(BET > 1) {
        BET--
        console.log(`BET: ${BET}`)
      }
    } else if (key === '\u0003') {
      console.log('exiting....')
      process.exit()
    }
  });
}

function debug(symbolWeights, key) {
  console.log('debugging')
  console.log(key)
  console.log(symbolWeights[key].reel1)
  console.log(symbolWeights[key].reel2)
  console.log(symbolWeights[key].reel3)
  console.log('-----------------');
  // console.log(reel1, reel2, reel3)
  console.log(`reel1 length: ${reel1.length}`)
  console.log(`reel2 length: ${reel2.length}`)
  console.log(`reel3 length: ${reel3.length}`)
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
