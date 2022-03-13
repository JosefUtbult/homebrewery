require('./snippetbar.less');
const React = require('react');
const createClass = require('create-react-class');
const _     = require('lodash');
const cx    = require('classnames');

//Import all themes

const Themes = {};
Themes['Legacy_5ePHB'] = require('themes/Legacy/5ePHB/snippets.js');
Themes['V3_5ePHB']     = require('themes/V3/5ePHB/snippets.js');
Themes['V3_CallOfCthulhu']     = require('themes/V3/CallOfCthulhu/snippets.js');

const execute = function(val, brew){
	if(_.isFunction(val)) return val(brew);
	return val;
};

const Snippetbar = createClass({
	displayName     : 'SnippetBar',
	getDefaultProps : function() {
		return {
			brew            : {},
			view            : 'text',
			onViewChange    : ()=>{},
			onInject        : ()=>{},
			onToggle        : ()=>{},
			showEditButtons : true,
			renderer        : 'legacy',
			undo            : ()=>{},
			redo            : ()=>{},
			historySize     : ()=>{}
		};
	},

	getInitialState : function() {
		return {
			renderer : this.props.renderer,
			snippets : []
		};
	},

	componentDidMount : async function() {
		const rendererPath = this.props.renderer == 'V3' ? 'V3' : 'Legacy';
		const themePath    = this.props.theme ?? '5ePHB';
		// const snippets = Themes[`${rendererPath}_${themePath}`];
		/* TODO: Remove this when theme snippets are working correctly */
		const snippets = Themes['V3_CallOfCthulhu'];
		this.setState({
			snippets : snippets
		});
	},

	componentDidUpdate : async function(prevProps) {
		if(prevProps.renderer != this.props.renderer) {
			const rendererPath = this.props.renderer == 'V3' ? 'V3' : 'Legacy';
			const themePath    = this.props.theme ?? '5ePHB';
			// const snippets = Themes[`${rendererPath}_${themePath}`];
			/* TODO: Remove this when theme snippets are working correctly */
			const snippets = Themes['V3_CallOfCthulhu'];
			this.setState({
				snippets : snippets
			});
		}
	},

	handleSnippetClick : function(injectedText){
		this.props.onInject(injectedText);
	},

	renderSnippetGroups : function(){
		let snippets = [];

		snippets = this.state.snippets.filter((snippetGroup)=>snippetGroup.view === this.props.view);

		return _.map(snippets, (snippetGroup)=>{
			return <SnippetGroup
				brew={this.props.brew}
				groupName={snippetGroup.groupName}
				icon={snippetGroup.icon}
				snippets={snippetGroup.snippets}
				key={snippetGroup.groupName}
				onSnippetClick={this.handleSnippetClick}
			/>;
		});
	},

	renderEditorButtons : function(){
		if(!this.props.showEditButtons) return;

		return <div className='editors'>
			<div className={`editorTool undo ${this.props.historySize.undo ? 'active' : ''}`}
				onClick={this.props.undo} >
				<i className='fas fa-undo' />
			</div>
			<div className={`editorTool redo ${this.props.historySize.redo ? 'active' : ''}`}
				onClick={this.props.redo} >
				<i className='fas fa-redo' />
			</div>
			<div className='divider'></div>
			<div className={cx('text', { selected: this.props.view === 'text' })}
				 onClick={()=>this.props.onViewChange('text')}>
				<i className='fa fa-beer' />
			</div>
			<div className={cx('style', { selected: this.props.view === 'style' })}
				 onClick={()=>this.props.onViewChange('style')}>
				<i className='fa fa-paint-brush' />
			</div>
			<div className={cx('meta', { selected: this.props.view === 'meta' })}
				onClick={()=>this.props.onViewChange('meta')}>
				<i className='fas fa-info-circle' />
			</div>
		</div>;
	},

	render : function(){
		return <div className='snippetBar'>
			{this.renderSnippetGroups()}
			{this.renderEditorButtons()}
		</div>;
	}
});

module.exports = Snippetbar;






const SnippetGroup = createClass({
	displayName     : 'SnippetGroup',
	getDefaultProps : function() {
		return {
			brew           : {},
			groupName      : '',
			icon           : 'fas fa-rocket',
			snippets       : [],
			onSnippetClick : function(){},
		};
	},
	handleSnippetClick : function(snippet){
		this.props.onSnippetClick(execute(snippet.gen, this.props.brew));
	},
	renderSnippets : function(){
		return _.map(this.props.snippets, (snippet)=>{
			return <div className='snippet' key={snippet.name} onClick={()=>this.handleSnippetClick(snippet)}>
				<i className={snippet.icon} />
				{snippet.name}
			</div>;
		});
	},

	render : function(){
		return <div className='snippetGroup snippetBarButton'>
			<div className='text'>
				<i className={this.props.icon} />
				<span className='groupName'>{this.props.groupName}</span>
			</div>
			<div className='dropdown'>
				{this.renderSnippets()}
			</div>
		</div>;
	},

});
