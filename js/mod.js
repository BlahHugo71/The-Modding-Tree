let modInfo = {
	name: "The Nanobot Tree",
	id: "8uifjansudgyeikauoigru89oatiu89w",
	author: "BlahHugo71",
	pointsName: "nanobots",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0: Literally nothing</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) {
		return new Decimal(0)
    }
	var gain = new Decimal(0)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e1e6"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

addLayer("m", {
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#CCCC00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "matter", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Disassemble nanobots for matter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        rows: 2,
        cols: 3,
        11: {
            title: "Construction",
            description: "Construct 1 nanobot every second.",
            cost: new Decimal(1)
        },
        12: {
            title: "Self-replication",
            description: "Nanobots self-replicate.",
            cost: new Decimal(1)
        },
        13: {
            title: "Optimization",
            description: "The more matter you have, the more nanobots you construct.",
            cost: new Decimal(5)
        },
        21: {
            title: "Size",
            description: "Nanobots are bigger, making more matter.",
            cost: new Decimal(20)
        },
        22: {
            title: "Hardware",
            description: "The more changes made to the nanobots' hardware, the more nanobots are constructed.",
            cost: new Decimal(75)
        },
        23: {
            title: "Expansion",
            description: "Nanobots get bigger constantly. As a result, matter gain is multiplied.",
            cost: new Decimal(5000)
        },
    },
    layerShown(){return true}
})