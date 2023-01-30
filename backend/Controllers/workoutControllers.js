const { default: mongoose } = require("mongoose");
const Workout = require("../Models/workoutModel");

// GET all
const getWorkouts = async (req, res) => {
	const workouts = await Workout.find({}).sort({ createdAt: -1 });

	res.status(200).json(workouts);
};

//GET one
const getWorkout = async (req, res) => {
	const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such json.'})
    }

	try {
		const workout = await Workout.findById(id);
		res.status(200).json(workout);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

//create new
const createWorkout = async (req, res) => {
	//Get all workouts
	const { title, reps, load } = req.body;

	try {
		const workout = await Workout.create({ title, reps, load });
		res.status(200).json(workout);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
};

//delete a workout
const deleteWorkout = async (req,res) => {
	const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such json.'})
    }   
    const workout = await Workout.findOneAndDelete({_id:id});
    
    if(!workout){
        return res.status(404).json({error: 'No such json.'})
    }
    res.status(200).json(workout);
}

//update a workout
const updateWorkout = async (req,res) => {
	const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such json.'})
    }

    const workout = await Workout.findOneAndUpdate({_id:id},{
        ...req.body,
    })  
    if(!workout){
        return res.status(404).json({error: 'No such json.'})
    }
    res.status(200).json(workout);

}

module.exports = {
	createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
};
