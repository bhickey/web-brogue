define([
    "jquery",
    "underscore",
    "backbone",
    "dataIO/send-generic",
    "models/auth"
], function ($, _, Backbone, send, AuthenticationModel) {

    var AuthenticationView = Backbone.View.extend({
        el: "#auth",
        model: new AuthenticationModel(),

        events: {
            "click #login-button": "loginSubmit",
            "click #register-button": "registerSubmit",
            "click #to-register": "changeToRegister",
            "click #to-login": "changeToLogin",
        },
        templates: {
            login: _.template($('#login').html()),
            register: _.template($('#register').html()),
            welcome: _.template($('#welcome').html())
        },
        initialize: function () {

            // TODO - if we are already logged on via cookie than we can render the other one

            this.render("login");
        },
        render: function (templateName) {
            this.$el.html(this.templates[templateName](this.model.toJSON()));
        },
        loginSubmit: function (event) {
            var loginData = {
                username: $('#username').val(),
                password: $('#password').val()
            };
            this.model.set({
                username: loginData.username
            });
            send("auth", "login", loginData);
        },
        registerSubmit: function (event) {
            var registerData = {
                username: $('#username').val(),
                password: $('#password').val(),
                repeat: $('#password-repeat').val()
            };
            send("auth", "register", registerData);
        },
        changeToRegister: function (event) {
            event.preventDefault();
            this.render("register");
        },
        changeToLogin: function (event) {
            event.preventDefault();
            this.render("login");
        },
        handleMessage: function (message) {

            if (message.result === "fail") {
                $('#auth-message')
                        .removeClass()
                        .addClass("error")
                        .html(message.data);
            }

            switch (message.data) {
                case "logged-in" :
                    this.render("welcome");
                    $('#play').removeClass("inactive");
                    break;
                case "registered" :
                    this.render("login");
                    $('#auth-message')
                            .removeClass()
                            .addClass("success")
                            .html("Successfully Registered - Please log in");
                    break;
            }

        }
    });

    return AuthenticationView;

});