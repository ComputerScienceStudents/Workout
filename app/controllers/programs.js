'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Program = mongoose.model('Program'), 
    _ = require('lodash');


/**
 * Find program by id
 */
exports.program = function(req, res, next, id) {
    Program.load(id, function(/*err, program*/) {
        /*if (err) return next(err);
        if (!program) return next(new Error('Failed to load program ' + id));
        req.program = program;
        next();*/

        //mock
        var mock = new Program({
            title: 'Tytuł',
            lead: 'Lead',
            description: 'opis'
        });
        req.program = mock;
        next();
    });
};

/**
 * Create an program
 */
exports.create = function(req, res) {
    var program = new Program(req.body);
    program.user = req.user;

    program.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                program: program
            });
        } else {
            res.jsonp(program);
        }
    });
};

/**
 * Update an program
 */
exports.update = function(req, res) {
    var program = req.program;

    program = _.extend(program, req.body);

    program.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                program: program
            });
        } else {
            res.jsonp(program);
        }
    });
};

/**
 * Delete an program
 */
exports.destroy = function(req, res) {
    var program = req.program;

    program.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                program: program
            });
        } else {
            res.jsonp(program);
        }
    });
};

/**
 * Show an program
 */
exports.show = function(req, res) {
    var mock = new Program({
        title: 'Tytuł',
        lead: 'Lead',
        description: 'opis'
    });
    res.jsonp(mock);
};

/**
 * List of Programs
 */
exports.all = function(req, res) {
    Program.find().sort('-created').populate('user', 'name username').exec(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            var mockPrograms = [];
            var names = ['Pompa!', 'Masa jest, teraz rzeźbić', 'Dla staruszków', 'Informatyk style', 'Pełen hardkor', 'Kokosowy koksu'];
            var leads = ['Pompuj pompe', 'Dla tych, co przesadzili z masą', '80 letnie bajcepsy', '5kg na klate', 'Hardkorr', 'Koksić trzeba koks'];
            var descriptions = ['Pompujesz pompą pompe? to jest program specjalnie dla Ciebie. Dla wszystkich strażaków!', 'Za dużo tłuszczyku? Dla tych co chcą zrzucić pare kilogramów',
            'Niech wszystkie babcie się zachwycą absem', 'Informatyk też musi dbać o forme. Nie pozwól, by mięśnie Ci przeszkadzały w klepaniu',
            'Będzie się lało! Pełny hardkor to program tylko dla ludzi hardkorów  i takie tam.', 'Brakuje Ci sił, gdy przerzucasz koks? To jest program spejcalnie dla Ciebie'];
            for(var i = 0; i < names.length; i++) {
                var rate = Math.round(Math.random()*10);
                mockPrograms.push(new Program({title: names[i], lead: leads[i], description: descriptions[i], rating: rate}));
            }
            res.jsonp(mockPrograms);
        }
    });
};