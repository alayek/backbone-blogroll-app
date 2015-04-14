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
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
}); // for a single blog

var BlogsView = Backbone.View.extend({
	model: blogs,
	el: $('.blogs-list'),
	initialize: function() {
		this.model.on('add', this.render, this);
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