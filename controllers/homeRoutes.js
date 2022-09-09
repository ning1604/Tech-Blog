const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// home routes
router.get("/", async (req, res) => {
    try {
        // gets all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // pass serialized data and session flag into template
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// login and sign up routes
router.get('/login', (req, res) => {
    // if the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
})

router.get('/signup', (req, res) => {
    // if the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup');
})

// user dashboard routes with 'withAuth' to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        if (!req.session.logged_in) {
            res.redirect("/login");
        }
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render("dashboard", {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;