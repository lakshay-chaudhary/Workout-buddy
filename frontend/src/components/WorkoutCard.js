
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

const WorkoutCard = ({ workout }) => {
	const { dispatch } = useWorkoutContext();

	const handleclick = async () => {
		const response = await fetch("/workout/" + workout._id, {
			method: "DELETE",
		});
		const json = response.json();

		if (response.ok) {
			dispatch({ type: "DELETE_WORKOUT", payload: json });
		}
	};
	

	return (
		<div className="workout-details">
			<h4>{workout.title}</h4>
			<p>
				<strong>Load (Kg) :</strong> {workout.load}{" "}
			</p>
			<p>
				<strong>Reps :</strong> {workout.reps}{" "}
			</p>
			<p>{workout.createdAt}</p>
			<span onClick={handleclick}>delete</span>
		</div>
	);
};

export default WorkoutCard;
