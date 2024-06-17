import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Login",
				}}
			/>
			<Stack.Screen
				name="register/index"
				options={{
					title: "Registro",
				}}
			/>
			<Stack.Screen
				name="home/index"
				options={{
					title: "Home",
				}}
			/>
		</Stack>
	);
}
