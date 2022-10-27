const _ = require('lodash');
const dedent = require('dedent-tabs').default;
const statsgenerator = require('./statsgenerator').generate;

const generateMonsterStats = function (multiplier) {
	return Math.floor(Math.random() * multiplier / 5) * 5 + 10;
};

/* TODO: This can probably be made more clever */
const generateName = function () {
	const NAMECHARACTERS = 'auozs\' eiyrght';
	let name = '';
	const nameLen = Math.floor(Math.random() * 10) + 3;
	for (let i = 0; i < nameLen; i++){
		name += NAMECHARACTERS.charAt(Math.random() * NAMECHARACTERS.length);
	}
	return name.charAt(0).toUpperCase() + name.slice(1);
};

const generateTitle = function () {
	return `The ${_.sample([
		'flame',
		'rock',
		'ghost',
		'entity',
		'wanderer'
	])} of ${_.sample([
		'Sol',
		'the stars',
		'the mountain',
		'Portsmouth',
		'the cabinet in our kitchen'
	])}`;
};

const generateAttacks = function (name, damageBonus) {
	const res = [];
	while (res.length < 3) {
		const attack = _.sample([
			`**Long fingers** : _${name}_ can choose to tickle you from a long distance as its 
				fingers reach far and wide. Its otherworldly tickles causes ${damageBonus} in damage.`,
			`**Weird smell** : _${name}_ smells kinda funky. Like something that's been in the pantry 
				for too long. Horrid enough to make you puke, which takes ${damageBonus} of physical damage.`,
			`**Damn tentacles** : _${name}_ has long, black tentacles protruding from its body. It can use 
				these to grapple one investigator each round. A grappled investigator needs to make a 
				strength check against _${name}'s_ strength in order to brake free, or the grapple deals 
				${damageBonus} in damage each round.`,
			`**Fire breath** : _${name}_ can cast Fireball from its mouth. An investigator hit by a ball of flame
				takes ${damageBonus} of damage, and receives severe burns.`,
			`**Scrotum pinch** : _${name}_ may use telekinesis in order to pinch an investigators scrotum. This does
				(regardless of the investigators gender) a great deal of pain, ${damageBonus} of physical damage, 
				and will leave the investigator paralyzed for 3 turns.`,
			`**Ice shards** : _${name}_ can materialize ice shards which it will hurl at great speeds. An investigator
				that is hit by them takes ${damageBonus} of blunt damage and ${damageBonus} of cold damage.`
		]);
		if(!res.includes(attack)) {
			res.push(attack);
		}
	}
	return res;
};

// Generates a number of dices needed to get a mean val as close to the 
// input as possible
const WEIGHT = 0.001;
const DICE_TYPES = [4, 6, 8, 10, 12, 20];
const generateDiceString = function(val) {

    // Select a resulting multiplier by dividing the val by an adjuster
    let adjuster = undefined;
    if(val >= 1000) {
        adjuster = 25;
    }
    else if(val >= 25) {
        adjuster = 5;
    }
    else if(val >= 4) {
        adjuster = 1;
    }
    else {
        return String(val)
    }
    const adjusted_val = val / adjuster;

    // Generates a weight adjuster in relation to the size of the value
    const weight_adjuster = Math.min(adjusted_val * WEIGHT, 1);

    let ratio = 0;
    let dice = 0;
    let weight = Infinity;

    DICE_TYPES.forEach((_dice) => {
        // Ratio on how many dices of a specific type is needed to get the a mean
        // value of val
        const _ratio = adjusted_val * 2 / _dice;

        // How far this ratio is from a perfect multiple
        const _diff = Math.abs(_ratio - Math.round(_ratio));

        // Makes a wight that is in relation to the ratio and the diff adjusted by 
        // the WEIGHT constant
        const _weight = Math.round(_ratio) * weight_adjuster + _diff * (1 - weight_adjuster);

        // Checks if this is the lowest weight found yet
        if(_dice <= adjusted_val * 2 && _weight < weight) {
            ratio = _ratio;
            dice = _dice;
            weight = _weight;
        }

    });
    
    return `${Math.round(ratio)}d${dice}${adjuster > 1 ? 'x' + adjuster : ''}`;
};

module.exports = ()=>{
	const name = generateName();

	// Randomize stats where the damage bonus is positive
	let stats;
	do {
		// Should multiply all stats with a randomized value mapped to an exponential in order to make less powerful
		// monster more common, and powerful ones rare
		const multiplier = Math.floor(Math.exp(Math.random() * 6.9)) + 40;
		stats = statsgenerator({
			'str' : generateMonsterStats(multiplier),
			'con' : generateMonsterStats(multiplier),
			'siz' : generateMonsterStats(multiplier),
			'dex' : generateMonsterStats(multiplier),
			'int' : generateMonsterStats(multiplier),
			'pow' : generateMonsterStats(multiplier)
		});
	} while (stats['str'] + stats['siz'] < 204);

	const attacks = generateAttacks(name, stats['damageBonus']);

	// |  char.  | averages |  rolls    |
	// |---------|----------|-----------|
	// |   STR   |   260    | (5D20 x5) |
	// |   DEX   |   110    | (4D10 x4) |
	// |   CON   |   150    | (5D10 x6) |
	// |   INT   |    70    | (4D8  x5) |
	// |   SIZ   |   220    | (4D20 x5) |
	// |   POW   |   180    | (6D10 x6) |

	return dedent `
        {{cocCharacter
        ### ${name}
        ${generateTitle()}.

        {{cocStatsBlock
        #### ${name}
        
        |  char.  | averages |  rolls    |
        |---------|----------|-----------|
        |   STR   |   ${stats['str']}    | ${generateDiceString(stats['str'])} |
        |   DEX   |   ${stats['dex']}    | ${generateDiceString(stats['dex'])} |
        |   CON   |   ${stats['con']}    | ${generateDiceString(stats['con'])} |
        |   INT   |   ${stats['siz']}    | ${generateDiceString(stats['siz'])} |
        |   SIZ   |   ${stats['int']}    | ${generateDiceString(stats['int'])} |
        |   POW   |   ${stats['pow']}    | ${generateDiceString(stats['pow'])} |
        
        }}
        
        **Hit Points**        : ${stats['hitPoints']}

        **Damage Bonus**      : ${stats['damageBonus']}

        **Attacks per round** : ${Math.floor(Math.random() * 5) + 1}

        **Build**             : ${stats['build']}

        **Magic Points**      : ${Math.floor(Math.random() * 100) + 1}
        
        **Move**              : ${stats['mov']}
        
        
        #### Attacks
        
        ${attacks[0]}
        
        ${attacks[1]}
        
        ${attacks[2]}
        
        **Armor**: ${stats['con']} points of armor.
        
        **Spells**: All spells concerning the nature of _${name}_.
        
        **Sanity Loss**: An investigator that sees _${name}_ takes a 1D10/1D100 of sanity loss.
        
        }}\n\n`;
};