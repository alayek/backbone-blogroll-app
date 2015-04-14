// Backbone Model
var Blog = Backbone.Model.extend({
	defaults : {
		author: '',
		title: '',
		url: ''
	}
});

// Backbone Collection
var BlogCollection = Backbone.Collection.extend({});

// var blog1 = new Blog({author: 'Arijit', title : 'Arijit\'s blog', url : 'arijit.wordpress.com'});
// var blog2 = new Blog({author: 'Arijit', title : 'Arijit\'s second blog', url : 'arijit2.wordpress.com'});

var blogs = new BlogCollection();

// Backbone Views
var BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.blogs-list-template').html());
	},
	events : {
		// when element with given class is clicked, fire the function
		'click .edit-blog' : 'edit',
		'click .update-blog': 'update',
		'click .cancel-edit': 'cancel',
		'click .delete-blog': 'delete'
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	edit: function() {
		this.$('.edit-blog').hide();
		this.$('.delete-blog').hide();
		this.$('.update-blog').show();
		this.$('.cancel-edit').show();

		// store current values
		var author = this.$('.author').html();
		var title = this.$('.title').html();
		var url = this.$('.url').html();

		this.$('.author').html('<input type="text" class="form-control author-update" value="' + author + '">');
		this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + '">');
		this.$('.url').html('<input type="text" class="form-control url-update" value="' + url + '">');
	},
	update : function() {
		// invoke set method only once.
		// if you invoke it more, 
		// the 'change' event would emit those many times
		this.model.set({
			'author': $('.author-update').val(),
			'title': $('.title-update').val(),
			'url': $('.url-update').val()
		});
	},
	cancel: function() {
		this.render();
	},
	delete: function() {
		this.model.destroy();
	}
}); // for a single blog

var BlogsView = Backbone.View.extend({
	model: blogs,
	el: $('.blogs-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', this.render, this);
		this.model.on('remove', this.render, this);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog) {
			self.$el.append((new BlogView({model: blog})).render().$el);
		});
		return self;
	}
}); // for blog collection


// initialize a blogs view
var blogsView = new BlogsView();

$(document).ready(function() {
	$('.add-blog').on('click', function() {
		var blog = new Blog({
			author: $('.author-input').val(),
			title: $('.title-input').val(),
			url: $('.url-input').val()
		});
		blogs.add(blog);
		$('.author-input').val('');
		$('.title-input').val('');
		$('.url-input').val('');
	});
});