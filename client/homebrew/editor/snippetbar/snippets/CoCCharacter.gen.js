const dedent = require('dedent-tabs').default;

module.exports = ()=>{
    return dedent`
        {{cocCharacter
        | Stats | Value |
        | ----- | ----- |
        |   STR |   50  |
        |   CON |   50  |
        |   SIZ |   50  |
        |   DEX |   50  |
        |   INT |   50  |
        |   POW |   50  |
        
        **Hit Points**   :: 10
        
        **Damage Bonus** :: -
        
        **Build**        :: 0
        
        **Move**         :: 8
        
        **Skills**
        
        Fighting (Brawl) :: 50%
        }}`
};