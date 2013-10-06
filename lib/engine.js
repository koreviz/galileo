/**
 * Kore Engine
 * Copyright(c) 2012 Koreviz
 * MIT Licensed
 */
var request = require('request')

exports = module.exports = function(args) {
    return new Engine(args)
}

/**
 * Engine
 */
var Engine = function(args) {
	this.args = args || []

	this.api = '/api/clips'
	this.user = ''
	this.limit = '1000000'
	this.protocol = 'https://'
}

Engine.prototype = {
	/**
	 * auth
	 */
	auth: function(arg) { 
		this.user = arg + '@'
		this.url = this.protocol + this.user + 'kippt.com' + this.api 
	},

	/**
	 * log
	 */
	log: function(res) {
		console.log('  \033[34m%s\033[0m', res.id)
		console.log('  \033[36m%s\033[0m', res.url)
		console.log('  \033[33m%s\033[0m', res.title)
		if (res.notes)
		console.log('  \033[90m%s\033[0m', res.notes)

		console.log()
	},

	/**
	 * add
	 */
	add: function() {
		request.post({
			url: this.url,
			body: '{"url":"' + this.args.shift() + '", "title":"' + this.args.shift() + '"}'
		},
		function() {
			process.exit()
		})
	},

	/**
	 * list
	 */
	list: function() {
		var self = this

		request.get({
			url: self.url,
			qs: { limit: self.limit },
		},
		function(err, res, body) {
			var body = JSON.parse(body)

			body.objects.forEach(
			function(obj, index, array) {
				self.log(obj)

				if (index+1 === array.length)
				process.exit()
			})
		})
	},

	/**
	 * remove
	 */
	remove: function() {
		request.del(this.url + '/' + this.args.shift(),
		function() {
			process.exit()
		})
	},

	/**
	 * search
	 */
	search: function() {
		var self = this

		this.api = '/api/search/clips'
		this.url = this.protocol + this.user + 'kippt.com' + this.api

		request.get({ 
		url: this.url, qs: { q: this.args.shift()  } },
		function(err, res, body) {
			var body = JSON.parse(body)

			body.objects.forEach(
			function(obj, index, array) {
				self.log(obj)

				if (index+1 === array.length)
				process.exit()
			})
		})
	},

	set: function(args) { this.args = args }
}