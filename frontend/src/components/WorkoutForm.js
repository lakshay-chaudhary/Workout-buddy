import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
	const { dispatch } = useWorkoutContext();
	const [title, setTitle] = useState("");
	const [reps, setReps] = useState("");
	const [load, setLoad] = useState("");
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const workout = { title, reps, load };

		const response = await fetch("/workout", {
			method: "POST",
			body: JSON.stringify(workout),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const json = response.json();

		if (!response.ok) {
			setError(json.error);
			console.log(error);
		}
		if (response.ok) {
			dispatch({
				type: "CREATE_WORKOUT",
				payload: json,
			});
			setTitle("");
			setReps("");
			setLoad("");
			setError(null);
			console.log("new workout added", json);
		}
	};

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a new Workout</h3>

			<label>Excersise title:</label>
			<input
				type="text"
				onChange={(e) => {
					setTitle(e.target.value);
				}}
				value={title}
			/>
			<label>Reps :</label>
			<input
				type="number"
				onChange={(e) => {
					setReps(e.target.value);
				}}
				value={reps}
			/>
			<label>Load (Kg):</label>
			<input
				type="text"
				onChange={(e) => {
					setLoad(e.target.value);
				}}
				value={load}
			/>
			<button>Add Workout</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default WorkoutForm;
