const _ = require('lodash');
const dedent = require('dedent-tabs').default;

module.exports = {

    quote : function (classes) {
        return dedent `
            #${classes.indexOf('wide') !== -1 ? '' : '#'} Azathoth
            
            {{titleQuote,${classes}
            
            That last amorphous blight of nethermost confusion which
            blasphemes and bubbles at the center of all infinity—the
            boundless daemon sultan Azathoth, whose name no lips
            dare speak aloud, and who gnaws hungrily in inconceivable,
            unlighted chambers beyond time amidst the muffled,
            maddening beating of vile drums and the thin
            monotonous whine of accursed flutes.
            
            — H.P. Lovecraft, The Dream-Quest of Unknown Kadath
            
            }}
            
            `
    }

};