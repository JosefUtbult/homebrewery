/* eslint-disable max-lines */

const cocCharacterGen = require('./snippets/CoCCharacter.gen');
const cocMonsterblockGen = require('./snippets/CoCMonsterblock.gen');
const titleQuoteGen = require('./snippets/titleQuote.gen');
const dedent = require('dedent-tabs').default;


module.exports = [
	/*****************  Call of Cthulhu ******************/

	{
		groupName : 'Call of Cthulhu',
		icon      : 'fas fa-eye',
		view      : 'text',
		snippets  : [
			{
				name : 'Wide title quote',
				icon : 'fas fa-quote-right',
				gen : titleQuoteGen.quote('wide')
			},
			{
				name : 'Title quote',
				icon : 'fas fa-quote-left',
				gen : titleQuoteGen.quote('')
			},
			{
				name : 'Character',
				icon : 'fas fa-mask',
				gen : cocCharacterGen
			},
			{
				name : 'Monsterblock',
				icon : 'fas fa-spider',
				gen : cocMonsterblockGen
			},
			{
				name : 'Descriptive Text Box',
				icon : 'fas fa-comment-alt',
				gen  : function(){
					return dedent`
						{{descriptive
						##### Time to Drop Knowledge
						Use descriptive boxes to highlight text that should be read aloud.

						**Tables and lists** both work within a descriptive box.
						}}
						\n`;
				}
			},
			{
				name : 'Note',
				icon : 'fas fa-sticky-note',
				gen  : function(){
					return dedent`
						{{note
						##### Time to Drop Knowledge
						Use notes to point out some interesting information.

						**Tables and lists** both work within a note.
						}}
						\n`;
				},
			},
			{
				name : 'Letter',
				icon : 'fas fa-envelope-open-text',
				gen  : function(){
					return dedent`
						{{letter
						## Letter to someone
		
						Here is a template to stylize a letter for your investigators
						
						You can add a signature using the sixth level heading:
						
						###### A friend
						}}
						`;
				},
			},
			{
				name : 'Book',
				icon : 'fas fa-book',
				gen  : function(){
					return dedent`
						{{book
						## Chapter 1
		
						Here is a template to stylize a book for your investigators
						
						You can add an author and title using the sixth level heading:
						
						###### The Programmer, _How to make books_
						}}
						`;
				},
			}
		]
	},



	/*********************  TABLES *********************/

	{
		groupName : 'Tables',
		icon      : 'fas fa-table',
		view      : 'text',
		snippets  : [
			{
				name : 'Table',
				icon : 'fas fa-th-list',
				gen  : function(){
					return dedent`
						##### Damage Bonus and Build
						| STR + SIZ | Damage Bonus | Build |
						|:----------|:------------:|:-----:|
						|   2 — 64  |     –2       |  -2   |
						|  65 — 84  |     –1       |  -1   |
						|  85 — 124 |     None     |   0   |
						| 125 — 164 |     +1D4     |  +1   |
						| 165 — 204 |     +1D6     |  +2   |
						| 205 — 284 |     +2D6     |  +3   |
						| 285 — 364 |     +3D6     |  +4   |
						| 365 — 444 |     +4D6     |  +5   |
						| 445 — 524 |     +5D6     |  +6   |
						\n`;
				}
			},
			{
				name : 'Wide Table',
				icon : 'fas fa-list',
				gen  : function(){
					return dedent`
						{{wide
						##### Handguns
						
						| Name         | Skill              | Damage     | Base Range | Bullets in Gun (Mag) |
						|:------------:|:------------------:|:----------:|:----------:|:--------------------:|
						| Flintlock    | Firearms (handgun) | 1D6+1      | 10 yards   | 1                    |
						| .32 Revolver | Firearms (handgun) | 1D8        | 15 yards   | 6                    |
						| Beretta M9   | Firearms (handgun) | 1D10       | 15 yards   | 15                   |
						| .44 Magnum   | Firearms (handgun) | 1D10+1D4+2 | 15 yards   | 6                    |
						| Desert Eagle | Firearms (handgun) | 1D10+1D6+3 | 15 yards   | 7                    |
						
						}}
						\n`;
				}
			},
			{
				name : 'Split Table',
				icon : 'fas fa-th-large',
				gen  : function(){
					return dedent`
						##### Typical Difficulty Classes
						{{column-count:2
						| Task Difficulty | DC |
						|:----------------|:--:|
						| Very easy       | 5  |
						| Easy            | 10 |
						| Medium          | 15 |

						| Task Difficulty   | DC |
						|:------------------|:--:|
						| Hard              | 20 |
						| Very hard         | 25 |
						| Nearly impossible | 30 |
						}}
						\n`;
				}
			}
		]
	},

];
