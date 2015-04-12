// Backbone Model
var Blog = Backbone.Model.extend({
	defaults : {
		author: '',
		title: '',
		url: ''
	}
});

var BlogCollection = Backbone.Collection.extend({});

var blog1 = new Blog({author: 'Arijit', title : 'Arijit\'s blog', url : 'arijit.wordpress.com'});
var blog2 = new Blog({author: 'Arijit', title : 'Arijit\'s second blog', url : 'arijit2.wordpress.com'});

var blogs = new BlogCollection([blog1, blog2]);