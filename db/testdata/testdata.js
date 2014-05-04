db.programs.remove({});
db.exercises.remove({});

var predefinedExercises = [];
predefinedExercises.push({
	title: 'push-ups',
	description: 'A push-up is a common calisthenics exercise performed in a prone position by raising and lowering the body using the arms. Push-ups exercise the pectoral muscles, triceps, and anterior deltoids, with ancillary benefits to the rest of the deltoids, serratus anterior, coracobrachialis and the midsection as a whole.',
	video: 'http://www.youtube.com/watch?v=FtcKhNzopTo',
	minature: 'http://i1.ytimg.com/vi/FtcKhNzopTo/mqdefault.jpg',
	categories: ['Chest']
});
predefinedExercises.push({
	title: 'pull-ups',
	description: 'A pull-up is a variety of upper-body compound pulling motions for the purpose of exercise. The pull-up has two main methods of execution; the first is with a pronated (overhand) grip and the second is with a supinated (underhand) grip.',
	video: 'http://www.youtube.com/watch?v=blpuO2vJo38',
	minature: 'http://i1.ytimg.com/vi/blpuO2vJo38/mqdefault.jpg',
	categories: ['Abdominal', 'Chest']
});
predefinedExercises.push({
	title: 'squats',
	description: 'In strength training, the squat is a compound, full body exercise that trains primarily the muscles of the thighs, hips and buttocks, quads (vastus lateralus medialis and intermedius), hamstrings, as well as strengthening the bones, ligaments and insertion of the tendons throughout the lower body.',
	video: 'http://www.youtube.com/watch?v=xK9jzjsTJts',
	minature: 'http://i1.ytimg.com/vi/xK9jzjsTJts/mqdefault.jpg',
	categories: ['Legs', 'Abdominal']
});
predefinedExercises.push({
	title: 'stretching',
	description: 'Stretching is a form of physical exercise in which a specific muscle or tendon (or muscle group) is deliberately flexed or stretched in order to improve the muscles felt elasticity and achieve comfortable muscle tone. The result is a feeling of increased muscle control, flexibility and range of motion. Stretching is also used therapeutically to alleviate cramps.',
	video: 'http://www.youtube.com/watch?v=sVZBZ6wpqmg',
	minature: 'http://i1.ytimg.com/vi_webp/sVZBZ6wpqmg/mqdefault.webp',
	categories: ['Stretching', 'Abdominal']
});

for (i = 0; i < predefinedExercises.length; i++) {
	db.exercises.insert(predefinedExercises[i]);
}

var exId1 = db.exercises.findOne({title:'push-ups'})._id;
var exId2 = db.exercises.findOne({title:'pull-ups'})._id;
var exId3 = db.exercises.findOne({title:'squats'})._id;
var exId4 = db.exercises.findOne({title:'stretching'})._id;

var predefinedPrograms = [];
predefinedPrograms.push({
	title: 'Example program',
	exercises: [{
		repetitions: 2,
		pause: 30,
		exercise: exId1
	},
	{
		length: 5,
		pause: 5,
		exercise: exId2
	},
	{
		length: 50,
		pause: 30,
		exercise: exId3
	},
	{
		repetitions: 10,
		pause: 10,
		exercise: exId4
	}
	],
	lead:'Example lead',
	description:'Example description'
})

for (i = 0; i < predefinedPrograms.length; i++) {
	db.programs.insert(predefinedPrograms[i]);
}

