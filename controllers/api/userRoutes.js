const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('testing');
    res.json('Successful');
});

module.exports = router;