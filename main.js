//Models & Collections

var Wine = Backbone.Model.extend();

var WineCollection = Backbone.Collection.extend({
	
	model: Wine

});

//Views

var WineListView = Backbone.View.extend({
	
	tagName: "ul",
	
	initialize: function () {
		
	},
	
	render: function () {
		_.each(this.model.models, function (wine) {
			$(this.el).append(new WineListItemView({model: wine}).render())
		}, this);
		return this;
	}
	
});

var WineListItemView = Backbone.View.extend({
	
	tagName: "li",
	
	itemTemplate: _.template($('.wine-item')),
	
	render: function () {
		$(this.el).html(this.itemTemplate(this.model.toJSON()));
		return this;
	}
		
});

var WineEdit = Backbone.View.extend({
	
	tagName: "div",
	
	editTemplate: _.template($('.wine-edit'));
	
	render: function () {
		$(this.el).html(this.editTemplate(this.model.toJSON()));
		return this;
	}
	
});

var Router = Backbone.Router.extend({
	
	routes: {"": "list",
			 "wines:id": "wineDetails"		
			},
	
	list:function () {
		this.wineList = new WineCollection();
		this.wineListView = new WineListView(this.wineList);
		$('.list-view').html(this.wineListView.render().el);
	},
	
	wineDetails: function() {
		this.wine = this.wineList.get(id);
		this.wineEdit = new WineEdit({model: this.wine});
		$('.edit-view').html(this.wineEdit.render().el);
	}
	
});
