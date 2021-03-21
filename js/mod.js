let modInfo = {
	name: "The Colorful Tree",
	id: "8uifjansudgyeikauoigru89oatiu89w",
	author: "BlahHugo71",
	pointsName: "colors",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.1",
	name: "Content stuffs",
}

let changelog = `<h1>Changelog:</h1><br>
    <h3>v0.1.1: Content stuffs</h3><br>
        - Added basic upgrades.<br>
        - Already regret doing this<br>
	<h3>v0.1: Somehow playable</h3><br>
		- Added the first row.<br>
		- Fixed hotkeys.<br>
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
    if (hasUpgrade("r", 11)) {gain = gain.add(1)}
    if (hasUpgrade("g", 11)) {gain = gain.add(1)}
    if (hasUpgrade("b", 11)) {gain = gain.add(1)}
    if (hasUpgrade("b", 12)) {gain = gain.mul(upgradeEffect("b", 12))}
    if (hasUpgrade("r", 13)) {gain = gain.mul(upgradeEffect("r", 13))}
    if (hasUpgrade("g", 13)) {gain = gain.mul(upgradeEffect("g", 13))}
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
	return player.points.gte(new Decimal("e280000000"))
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

addLayer("r", {
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "red points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("r", 12)) {mult = mult.mul(upgradeEffect("r", 12))}
        if (hasUpgrade("g", 12)) {mult = mult.mul(upgradeEffect("g", 12))}
        if (hasUpgrade("g", 13)) {mult = mult.mul(upgradeEffect("g", 13))}
        if (hasUpgrade("b", 13)) {mult = mult.mul(upgradeEffect("b", 13))}
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for red points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	infoboxes: {
		lore: {
			title: "red",
			body() { return "Red points excel at boosting their own gain." },
		},
	},
    upgrades: {
        rows: 1,
        cols: 3,
        11: {
            title: "Colored",
            description: "Adds 1 to base color production.",
            cost: new Decimal(1),
        },
        12: {
            title: "Red Effect",
            description: "Red points boost red point production.",
            cost: new Decimal(3),
            effect() {return player.r.points.pow(0.5)}
        },
        13: {
            title: "Red Influence",
            description: "Red points boost other point gain and color production at a reduced rate.",
            cost: new Decimal(10),
            effect() {return player.r.points.pow(0.25)}
        },
    },
    layerShown(){return true}
})

addLayer("g", {
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00FF00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "green points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("r", 13)) {mult = mult.mul(upgradeEffect("r", 13))}
        if (hasUpgrade("b", 13)) {mult = mult.mul(upgradeEffect("b", 13))}
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for green points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	infoboxes: {
		lore: {
			title: "green",
			body() {return "Green points can boost other effects greatly."},
		},
	},
    upgrades: {
        rows: 1,
        cols: 3,
        11: {
            title: "Colored",
            description: "Adds 1 to base color production.",
            cost: new Decimal(1),
        },
        12: {
            title: "Green Effect",
            description: "Green points boost gain of all other points.",
            cost: new Decimal(3),
            effect() {return player.g.points.pow(0.3)}
        },
        13: {
            title: "Green Influence",
            description: "Green points boost red point gain and color production at a reduced rate.",
            cost: new Decimal(10),
            effect() {return player.g.points.pow(0.15)}
        },
    },
    layerShown(){return true}
})

addLayer("b", {
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0000FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "blue points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("g", 12)) {mult = mult.mul(upgradeEffect("g", 12))}
        if (hasUpgrade("r", 13)) {mult = mult.mul(upgradeEffect("r", 13))}
        if (hasUpgrade("g", 13)) {mult = mult.mul(upgradeEffect("g", 13))}
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for blue points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	infoboxes: {
		lore: {
			title: "blue",
			body() {return "Blue points heavily boost color gain."},
		},
	},
    upgrades: {
        rows: 1,
        cols: 3,
        11: {
            title: "Colored",
            description: "Adds 1 to base color production.",
            cost: new Decimal(1),
        },
        12: {
            title: "Blue Effect",
            description: "Blue points boost color production",
            cost: new Decimal(3),
            effect() {return player.b.points.pow(0.5)}
        },
        13: {
            title: "Blue Influence",
            description: "Blue points boost red point gain and other point gain at a reduced rate.",
            cost: new Decimal(10),
            effect() {return player.b.points.pow(0.25)}
        },
    },
    layerShown(){return true}
})
