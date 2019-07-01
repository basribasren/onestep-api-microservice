module.exports = {
	async up(db) {
		// TODO write your migration here. Return a Promise (and/or use async & await).
		// See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
		// Example:
		// await db.collection('profiles')
		// 	.find({ lastName: { $exists: false } })
		// 	.forEach(result => {
		// 		if (!result) return next('All docs have lastName')
		// 		if (result.name) {
		// 			const { name } = result

		// 			result.lastName = name.split(' ')[1]
		// 			result.firstName = name.split(' ')[0]
		// 		}
		// 		return db.collection('profiles').updateOne(result)
		// 	})
		// return db.collection('user').updateOne({ artist: 'The Beatles' }, { $set: { blacklisted: true } })
	},

	async down(db) {
		// TODO write the statements to rollback your migration (if possible)
		// Example:
		// await db.collection('profiles')
		// 	.updateMany({ lastName: { $exists: true } }, {
		// 		$unset: {
		// 			lastName: "",
		// 			firstName: "",
		// 		}
		// 	}, { multi: true })
		// return db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}})
	}
}
