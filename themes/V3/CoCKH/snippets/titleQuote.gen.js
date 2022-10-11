const _ = require('lodash');
const dedent = require('dedent-tabs').default;

const getQuote = function () {
	return _.sample([
		[
			'Azathoth',
			dedent(`That last amorphous blight of nethermost confusion which
			blasphemes and bubbles at the center of all infinity—the
			boundless daemon sultan Azathoth, whose name no lips
			dare speak aloud, and who gnaws hungrily in inconceivable,
			unlighted chambers beyond time amidst the muffled,
			maddening beating of vile drums and the thin
			monotonous whine of accursed flutes.`),
			'H.P. Lovecraft, _The Dream-Quest of Unknown Kadath_'
		],
		[
			'Great Cthulhu',
			dedent(`A monster of vaguely anthropoid outline, but with
			an octopus-like head whose face was a mass of
			feelers, a scaly, rubbery-looking body, prodigious
			claws on hind and fore feet, and long, narrow
			wings behind. This thing...was of a somewhat
			bloated corpulence...It lumbered slobberingly into
			sight and gropingly squeezed its gelatinous green
			immensity through the black doorway...
			A mountain walked or stumbled`),
			'H.P. Lovecraft, _The Call of Cthulhu_'
		],
		[
			'Hastur the Unnameable',
			dedent(`Utterly alien landscape...Foreground a deep lake. Hali?
			In five minutes the water began to ripple where something
			rose. Facing inward. A titanic aquatic being, tentacled.
			Octopoid, but far, far larger—ten—twenty times larger than
			the giant Octopus apallyon of the west coast. What was its
			neck alone easily fifteen rods in diameter.
			Could not risk chance of seeing its face.`),
			'August Derleth, _The Gable Window_'
		],
		[
			`The King In Yellow`,
			dedent(`“You are speaking of the King in Yellow,” I groaned, with a shudder.
			
			“He is a king whom emperors have served.”

			“I am content to serve him,” I replied.`),
			'Robert W Chambers, _The Repairer of Reputations_'
		]
	]);
};

module.exports = {
	quote : function (classes) {
		const _quote = getQuote();
		return dedent `
            #${classes.indexOf('wide') !== -1 ? '' : '#'} ${_quote[0]}
            
            {{titleQuote,${classes}
           	
           	${_quote[1]} 
            
            ###### ${_quote[2]}
            
            }}
            
            `;
	}

};