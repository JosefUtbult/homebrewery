const _ = require('lodash');
const dedent = require('dedent-tabs').default;
const statsgenerator = require('../statsgenerator').generate;

const getCharacterNameAndHome = function () {
	return _.sample([
		// {'name': '', 'home': ''},
		{ 'name': 'Peter Persson', 'home': 'Arvidsjaur, in the north of Sweden' },
		{ 'name': 'Daniel Aubert', 'home': 'Versailles, south-west of Paris' },
		{ 'name': 'Gracie O\'Quinn', 'home': 'Galway, Ireland' },
		{ 'name': 'Logan Gill', 'home': 'the streets of Chicago' },
		{ 'name': 'Speth', 'home': 'the planet Vulcan' },
		{ 'name': 'Torsten Järnefelt', 'home': 'the island Öckerö, outside of Gothenburg' },
		{ 'name': 'Tom Cole', 'home': 'Florida' },
		{ 'name': 'Vel Cispius Arruntius', 'home': 'ancient Rome' },
		{ 'name': 'Laurel Delgado', 'home': 'outside of Salt Lake City, Utah' },
	]);
};

const getOccupation = function () {
	return _.sample([
		'Accountant',
		'Acrobat',
		'Agency Detective',
		'Ambassador',
		'Antique Dealer',
		'Architect',
		'Artist',
		'Author',
		'Bank Robber',
		'Barber',
		'Bartender',
		'Bible Salesman',
		'Big Game Hunter',
		'Book Dealer',
		'Bookie',
		'Boss',
		'Bounty Hunter',
		'Boxer/Wrestler',
		'Burglar',
		'Bus Driver',
		'Catholic Priest',
		'Clergyman',
		'Clerk',
		'Cocktail Waitress',
		'Communist/Radical',
		'Company Officer/Executive',
		'Columnist',
		'Con Man',
		'Deacon/Elder',
		'Deep-sea Diver',
		'Dentist',
		'Designer',
		'Dilettante',
		'DJ',
		'Drifter',
		'Editor',
		'Elected official',
		'Entertainer',
		'Explorer',
		'Farmer/Farm Hand',
		'Federal Agent',
		'Fence',
		'Field Researcher',
		'Film Crew',
		'Film Star',
		'Fireman',
		'Foreign Correspondent',
		'Forger/Counterfeiter',
		'Forester',
		'Forensic Investigator',
		'Forensic Surgeon',
		'Gambler',
		'Gangster',
		'Gardener',
		'Golf Pro',
		'Gravedigger',
		'Hacker',
		'Hired Goon',
		'Hit Man',
		'Hobo',
		'Hooker',
		'Journalist',
		'Judge',
		'Lawyer',
		'Librarian',
		'Loan Shark',
		'Lumberjack',
		'Manager/Coach',
		'(Medical) Technician',
		'Mental Hospital Attendant',
		'Mercenary',
		'Military Officer',
		'Miner',
		'Missionary',
		'Mountain Climber',
		'Museum Curator',
		'Musician',
		'News Chopper Pilot',
		'Nurse',
		'Occultist',
		'Painter/Sculptor',
		'Parapsychologist',
		'Pharmacist',
		'Photographer',
		'Photojournalist',
		'Physician',
		'Pick Pocket',
		'Pilot',
		'Plastic Surgeon',
		'Police Detective',
		'Policeman',
		'Practising Attorney',
		'Preacher',
		'Private Investigator',
		'Professional Sports Athlete',
		'Professor/Teacher',
		'Programmer',
		'Prosecuting Attorney',
		'Protestant Minister',
		'Psychologist',
		'Punk',
		'Rabbi',
		'Racecar Driver',
		'Ranch Hand/Cowboy',
		'Reporter',
		'Researcher',
		'Sailor',
		'Salesman',
		'Secretary',
		'Shifty Accountant/Lawyer',
		'Small Business Owner',
		'Smuggler',
		'Soldier/Marine',
		'Spy',
		'Stage Actor',
		'Stage Hand',
		'Stock Broker',
		'Student/Intern',
		'Stunt Man',
		'Surveyor',
		'Swimmer/Diver',
		'Talent Agent',
		'Taxi Driver',
		'Telephone Operator',
		'Tennis Pro',
		'Tribal Member',
		'Undertaker',
		'Uniformed Police Officer',
		'Union Activist',
		'Writer',
		'Zookeeper'
	]);
};

const getSkill = function () {
	return _.sample([
		'Accounting',
		'Anthropology',
		'Archaeology',
		'Appraise',
		'Firearms',
		'Charm',
		'Climb',
		'Credit Rating',
		'Cthulhu Mythos',
		'Disguise',
		'Dodge',
		'Drive Auto',
		'Elec. Repair',
		'Fast Talk',
		'Fighting (Brawl)',
		'Firearms (Handgun)',
		'Firearms (Rifle/Shotgun)',
		'First Aid',
		'History',
		'Intimidate',
		'Jump',
		'Language (Other)',
		'Language (Own)',
		'Law',
		'Library Use',
		'Listen',
		'Locksmith',
		'Mech. Repair',
		'Medicine',
		'Natural World',
		'Navigate',
		'Occult',
		'Persuade',
		'Pilot',
		'Psychoanalysis',
		'Psychology',
		'Ride',
		'Sleight of Hand',
		'Spot Hidden',
		'Stealth',
		'Survival',
		'Swim',
		'Throw',
		'Track',
	]);
};

const getHobbie = function () {
	return _.sample([
		'hiking',
		'backpacking',
		'camping',
		'hunting',
		'fishing',
		'archery',
		'canoeing',
		'kayaking',
		'running',
		'growing vegetables',
		'composting',
		'metal detecting',
		'bird watching',
		'beekeeping',
		'larping',
		'astronomy',
		'meteorology',
		'kite flying',
		'sand castle making',
		'hobby horsing',
		'antiquing',
		'coin collecting',
		'stamp collecting',
		'antique book and manuscript collecting',
		'art collecting',
		'shell and sea glass collecting',
		'leaf collecting and pressing',
		'postcard collecting',
		'shoe collecting',
		'toy collecting',
		'sports memorabilia collecting',
		'rock tumbling',
		'cooking',
		'baking',
		'gingerbread house making',
		'home brewing',
		'wine making',
		'mixology',
		'bread making',
		'cheese making',
		'sewing',
		'painting',
		'drawing',
		'origami',
		'photography',
		'scrapbooking',
		'calligraphy',
		'quilting',
		'crocheting',
		'knitting',
		'embroidery',
		'carpet and tapestry weaving',
		'designing and making clothes',
		'jewelry making',
		'pottery',
		'metal working',
		'wood carving',
		'welding',
		'leather tooling',
		'cobbling',
		'model railroads',
		'furniture building',
		'home improvement',
		'model building',
		'trivia',
		'board games',
		'card games',
		'chess',
		'puzzles',
		'juggling',
		'billiards',
		'genealogy',
		'language learning',
		'journaling',
		'creative writing',
		'home science experiments',
		'wikipedia editing',
		'playing the trumpet',
		'playing drums',
		'playing flute',
		'playing guitar',
		'thrifting',
		'makeup',
		'dancing',
		'aquarium keeping',
		'working on cars',
		'travel',
		'survivalist prepping',
		'mountain biking',
		'coffee roasting',
		'excessive gambling'
	]);
};

const generateHumanStat = function () {
	return Math.floor(Math.random() * (80) / 5) * 5 + 15;
};

module.exports = ()=>{
	const person = getCharacterNameAndHome();
	const occupation = getOccupation();

	const stats = statsgenerator({
		'str' : generateHumanStat(),
		'con' : generateHumanStat(),
		'siz' : generateHumanStat(),
		'dex' : generateHumanStat(),
		'int' : generateHumanStat(),
		'app' : generateHumanStat(),
		'pow' : generateHumanStat(),
		'edu' : generateHumanStat()
	});

	const hobby1 = getHobbie();
	let hobby2;
	do {
		hobby2 = getHobbie();
	} while (hobby1 === hobby2);

	return dedent`
        {{cocCharacter

        {{cocStatsBlock

        ### ${person['name']}
        
        ${occupation} from ${person['home']}
        
        |        |        |        |        |
        | ------ | ------ | ------ | ------ |
        | STR ${stats['str']} | CON ${stats['con']} | SIZ ${stats['siz']} | DEX ${stats['dex']} |
        | INT ${stats['int']} | APP ${stats['app']} | POW ${stats['pow']} | EDU ${stats['edu']} |
        
        }}
        
        **Hit Points**   : ${stats['hitPoints']}
        
        **Damage Bonus** : ${stats['damageBonus']}
        
        **Build**        : ${stats['build']}
        
        **Move**         : ${stats['mov']}
        
        :
        
        **Skills** : ${getSkill()} : ${generateHumanStat()}%, ${getSkill()} : ${generateHumanStat()}%, 
        ${getSkill()} : ${generateHumanStat()}%, ${getSkill()} : ${generateHumanStat()}%
            
        }}
        
        _${person['name']}_ is a ${occupation} from ${person['home']}. ${person['name'].replace(/ .*/, '')} likes ${hobby1} and ${hobby2}.`;
};