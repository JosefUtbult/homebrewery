/* eslint-disable max-lines */


const ClassTableGen      = require('../5ePHB/snippets/classtable.gen.js');
const CoverPageGen       = require('../5ePHB/snippets/coverpage.gen.js');
const TableOfContentsGen = require('../5ePHB/snippets/tableOfContents.gen.js');
const WatercolorGen      = require('../5ePHB/snippets/watercolor.gen.js');

const cocCharacterGen = require('./snippets/CoCCharacter.gen');
const cocMonsterblockGen = require('./snippets/CoCMonsterblock.gen');
const titleQuoteGen = require('./snippets/titleQuote.gen');
const dedent = require('dedent-tabs').default;


module.exports = [

	{
		groupName : 'Text Editor',
		icon      : 'fas fa-pencil-alt',
		view      : 'text',
		snippets  : [
			{
				name : 'Column Break',
				icon : 'fas fa-columns',
				gen  : '\n\\column\n'
			},
			{
				name : 'New Page',
				icon : 'fas fa-file-alt',
				gen  : '\n\\page\n'
			},
			{
				name : 'Vertical Spacing',
				icon : 'fas fa-arrows-alt-v',
				gen  : '\n::::\n'
			},
			{
				name : 'Horizontal Spacing',
				icon : 'fas fa-arrows-alt-h',
				gen  : ' {{width:100px}} '
			},
			{
				name : 'Wide Block',
				icon : 'fas fa-window-maximize',
				gen  : dedent`\n
					{{wide
					Everything in here will be extra wide. Tables, text, everything!
					Beware though, CSS columns can behave a bit weird sometimes. You may
					have to manually place column breaks with \`\column\` to make the
					surrounding text flow with this wide block the way you want.
					}}
					\n`
			},
			{
				name : 'QR Code',
				icon : 'fas fa-qrcode',
				gen  : (brew)=>{
					return `![]` +
							`(https://api.qrserver.com/v1/create-qr-code/?data=` +
							`https://homebrewery.naturalcrit.com${brew.shareId ? `/share/${brew.shareId}` : ''}` +
							`&amp;size=100x100) {width:100px;mix-blend-mode:multiply}`;
				}
			},
			{
				name : 'Page Number',
				icon : 'fas fa-bookmark',
				gen  : '{{pageNumber 1}}\n{{footnote PART 1 | SECTION NAME}}\n\n'
			},
			{
				name : 'Auto-incrementing Page Number',
				icon : 'fas fa-sort-numeric-down',
				gen  : '{{pageNumber,auto}}\n{{footnote PART 1 | SECTION NAME}}\n\n'
			},
			{
				name : 'Link to page',
				icon : 'fas fa-link',
				gen  : '[Click here](#p3) to go to page 3 Hello\n'
			},
			{
				name : 'Table of Contents',
				icon : 'fas fa-book',
				gen  : TableOfContentsGen
			},
			{
				name : 'Add Comment',
				icon : 'fas fa-code',
				gen  : '<!-- This is a comment that will not be rendered into your brew. Hotkey (Ctrl/Cmd + /). -->'
			}
		]
	},
	{
		groupName : 'Style Editor',
		icon      : 'fas fa-pencil-alt',
		view      : 'style',
		snippets  : [
			{
				name : 'Remove Drop Cap',
				icon : 'fas fa-remove-format',
				gen  : dedent`/* Removes Drop Caps */
						.page h1+p:first-letter {
							all: unset;
						}\n\n`
			},
			{
				name : 'Tweak Drop Cap',
				icon : 'fas fa-sliders-h',
				gen  : dedent`/* Drop Cap settings */
						.page h1 + p::first-letter {
							font-family: SolberaImitationRemake;
							font-size: 3.5cm;
							background-image: linear-gradient(-45deg, #322814, #998250, #322814);
							line-height: 1em;
						}\n\n`
			},
			{
				name : 'Add Comment',
				icon : 'fas fa-code',
				gen  : '/* This is a comment that will not be rendered into your brew. */'
			},
		]
	},

	/*********************** IMAGES *******************/
	{
		groupName : 'Images',
		icon      : 'fas fa-images',
		view      : 'text',
		snippets  : [
			{
				name : 'Image',
				icon : 'fas fa-image',
				gen  : dedent`
					![cat warrior](https://s-media-cache-ak0.pinimg.com/736x/4a/81/79/4a8179462cfdf39054a418efd4cb743e.jpg) {width:325px,mix-blend-mode:multiply}

					{{artist,position:relative,top:-230px,left:10px,margin-bottom:-30px
					##### Cat Warrior
					[Kyoung Hwan Kim](https://www.artstation.com/tahra)
					}}`
			},
			{
				name : 'Background Image',
				icon : 'fas fa-tree',
				gen  : dedent`
					![homebrew mug](http://i.imgur.com/hMna6G0.png) {position:absolute,top:50px,right:30px,width:280px}

					{{artist,top:80px,right:30px
					##### Homebrew Mug
					[naturalcrit](https://homebrew.naturalcrit.com)
					}}`
			},
			{
				name : 'Watercolor Splatter',
				icon : 'fas fa-fill-drip',
				gen  : WatercolorGen,
			},
			{
				name : 'Watermark',
				icon : 'fas fa-id-card',
				gen  : dedent`
				{{watermark Homebrewery}}\n`
			},
		]
	},

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
				name : 'CallOfCthulhu - Character',
				icon : 'fas fa-mask',
				gen : cocCharacterGen
			},
			{
				name : 'CallOfCthulhu - Monsterblock',
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




	/**************** PAGE *************/

	{
		groupName : 'Print',
		icon      : 'fas fa-print',
		view      : 'style',
		snippets  : [
			{
				name : 'A4 Page Size',
				icon : 'far fa-file',
				gen  : dedent`/* A4 Page Size */
					.page{
						width  : 210mm;
						height : 296.8mm;
					}\n\n`
			},
			{
				name : 'Square Page Size',
				icon : 'far fa-file',
				gen  : dedent`/* Square Page Size */
					.page {
						width   : 125mm;
						height  : 125mm;
						padding : 12.5mm;
						columns : unset;
					}\n\n`
			},
			{
				name : 'Ink Friendly',
				icon : 'fas fa-tint',
				gen  : dedent`
					/* Ink Friendly */
					*:is(.page,.monster,.note,.descriptive) {
						background : white !important;
						filter : drop-shadow(0px 0px 3px #888) !important;
					}

					.page img {
						visibility : hidden;
					}\n\n`
			},
		]
	},

];
