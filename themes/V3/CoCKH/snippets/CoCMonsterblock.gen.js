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
			`**Long fingers** : ${name} can choose to tickle you from a long distance as its 
				fingers reach far and wide. Its otherworldly tickles causes ${damageBonus} in damage.`,
			`**Weird smell** : ${name} smells kinda funky. Like something that's been in the pantry 
				for too long. Horrid enough to make you puke, which takes ${damageBonus} of physical damage.`,
			`**Damn tentacles** : ${name} has long, black tentacles protruding from its body. It can use 
				these to grapple one investigator each round. A grappled investigator needs to make a 
				strength check against ${name}'s strength in order to brake free, or the grapple deals 
				${damageBonus} in damage each round.`,
			`**Fire breath** : ${name} can cast Fireball from its mouth. An investigator hit by a ball of flame
				takes ${damageBonus} of damage, and receives severe burns.`,
			`**Scrotum pinch** : ${name} may use telekinesis in order to pinch an investigators scrotum. This does
				(regardless of the investigators gender) a great deal of pain, ${damageBonus} of physical damage, 
				and will leave the investigator paralyzed for 3 turns.`,
			`**Ice shards** : ${name} can materialize ice shards which it will hurl at great speeds. An investigator
				that is hit by them takes ${damageBonus} of blunt damage and ${damageBonus} of cold damage.`
		]);
		if(!res.includes(attack)) {
			res.push(attack);
		}
	}
	return res;
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

	return dedent `
        {{cocCharacter
        
        {{cocStatsBlock
        
        ### ${name}
        
        ${generateTitle()}
        
        |         |         |         |
        | ------- | ------- | ------- |
        | STR ${stats['str']} | CON ${stats['con']} | SIZ ${stats['siz']} |
        | DEX ${stats['dex']} | INT ${stats['int']} | POW ${stats['pow']} | 
        
        }}
        
        **Hit Points**        : ${stats['hitPoints']}
        **Damage Bonus**      : ${stats['damageBonus']}
        **Attacks per round** : ${Math.floor(Math.random() * 5) + 1}
        **Build**             : ${stats['build']}
        **Magic Points**      : ${Math.floor(Math.random() * 100) + 1}
        **Move**              : ${stats['mov']}
        
        
        ### Attacks
        
        ${attacks[0]}
        
        ${attacks[1]}
        
        ${attacks[2]}
        
        **Armor**: ${stats['con']} points of armor.
        
        **Spells**: All spells concerning the nature of ${name}.
        
        **Sanity Loss**: An investigator that sees ${name} takes a 1D10/1D100 of sanity loss.
        
        }}
    
`;

};