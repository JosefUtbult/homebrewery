const _ = require('lodash');
const dedent = require('dedent-tabs').default;

module.exports = ()=>{
    return dedent `
        {{cocCharacter
        
        {{cocStatsBlock
        
        ### CTHUGHA
        
        The Living Flame
        
        |         |         |         |
        | ------- | ------- | ------- |
        | STR 400 | CON 600 | SIZ 700 |
        | DEX 105 | INT 105 | POW 210 | 
        
        }}
        
        **Hit Points**        ::: 130
        **Damage Bonus**      ::: +13D6
        **Attacks per round** ::: 3
        **Build**             ::: 14
        **Magic Points**      ::: 42
        **Move**              ::: 0 (aerial drift)
        
        
        ### Attacks
        
        **Fighting attacks**: Each round, Cthugha can form pseudopods
        from its formless mass with which to flail or squeeze individual
        targets.
        
        **Automatic Scorch**: Summoned, Cthugha brings 1D100 x10 flame
        vampires with it, which immediately begin to set the area alight.
        Cthugha itself floats above, scorching and burning the entire
        site. Humans in the area lose hit points to the heat, starting
        in the round after Cthugha comes. Each round the players
        must attempt to roll CON. Upon failure, the investigator loses
        1 hit point per round until death. The only way to survive is
        to flee the area—a roughly circular area with a diameter of
        2D10 x 20 yards. Cthugha does not depart until that area has
        been thoroughly blasted and burned, unless first
        dismissed by means of a spell
        
        **Flame Burst**: Cthugha may belch forth fire
        instead of using pseudopods. A flame
        bust has a range of 150 yards and blankets
        the target site with fire, incinerating an
        area 20 yards across. Investigators within
        the area must attempt an Extreme CON
        roll (rolling equal to or below one-fifth
        of their CON): a failed roll indicates
        incineration. A success indicates 1D10
        hit point loss. Body armor is of no help
        against this attack, but an intervening wall
        or embankment would be.
        
        **Armor**: 14 points of armor. Weapons that come into contact with Cthugha are destroyed.
        
        **Spells**: All spells concerning entities of flame and itself.
        
        **Sanity Loss**: 1D3/1D20 Sanity points to see Cthugha.
        
        }}
    
`

};