
const handleRanking = (req, res, db) => {
    db.select('name', 'entries', 'email').from('users').orderBy('entries', 'desc').limit(10)
    .then(users => {
        res.json(users);
    })
    .catch(err => res.status(400).json('error getting ranking'))
}

module.exports = {
    handleRanking: handleRanking
}