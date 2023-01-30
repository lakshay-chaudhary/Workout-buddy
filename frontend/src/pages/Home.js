import { useEffect } from "react";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

const Home = () => {
	const { workouts, dispatch } = useWorkoutContext();

	useEffect(() => {
		const fetchWorkouts = async () => {
			const response = await fetch("/workout");
			const json = await response.json();

			if (response.ok) {
				dispatch({ type: "SET_WORKOUTS", payload: json });
				console.log("nice")
			}
		};
		fetchWorkouts();
	}, [dispatch]);

	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((workout) => (
						<WorkoutCard key={workout._id} workout={workout} />
					))}
			</div>
			<WorkoutForm />
		</div>
	);
};

export default Home;
