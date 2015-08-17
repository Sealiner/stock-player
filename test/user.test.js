var app = require('../index');
var assert = require('assert');
//var request = require('supertest')("http://localhost:5080");
var request = require('supertest')(app);
var should = require('should');

describe('user.test.js', function () {
	/**
	 * 用户登录测试模块
	 */
	describe('user/login', function () {
		it('should not login when password is wrong', function (done) {
			request.post('/user/login')
				.send({
					username: "alex001",
					password: "wrong password"
				})
				.end(function (err, res) {
					should.not.exist(err);
					res.text.should.containEql('用户名或密码不正确！');
					done();
				});
		});
		it('should not login when username does not exist', function (done) {
			request.post('/user/login')
				.send({
					username: "wrong username",
					password: "123" 
				})
				.end(function (err, res) {
					should.not.exist(err);
					res.text.should.containEql('用户名不存在！');
					done();
				});
		});
		it('should redirect to user center when both username and password are correct', function (done) {
			request.post('/user/login')
				.send({
					username: "alex001",
					password: "123"
				})
				.end(function (err, res) {
					should.exist(err);
					res.status.should.equal(302);
					res.header.location.should.equal('/user/center');
					done();
				});
		});
	});
	/**
	 * 用户注册测试模块
	 */
	describe('user/register', function () {
		it('should not register an already existing username', function (done) {
			request.post('/user/register')
				.send({
					username: "alex001",
					password: "33333"
				})
				.end(function (err, res) {
					should.not.exist(err);
					res.text.should.containEql('该用户名已存在！');
					done();
				});
		});
		it('should redirect to user center when register success', function (done) {
			request.post('/user/register')
				.send({
					username: "test"+new Date().getTime(),
					password: "123"
				})
				.end(function (err, res) {
					should.exist(err);
					res.status.should.equal(302);
					res.header.location.should.equal('/user/center');
					done();
				});
		});
	});
	
});