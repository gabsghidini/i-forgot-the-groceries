import React, { useState } from "react";
import {
	SafeAreaView,
	Pressable,
	Alert,
	Text,
	TextInput,
	Button,
} from "react-native";
import { Link } from "expo-router";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = async () => {
		if (email === "" || password === "") {
			console.log("Preencha todos os campos");
			return;
		}

		try {
			const response = await auth().signInWithEmailAndPassword(
				email,
				password
			);

			if (response.user) {
				router.replace("/home");
			}
		} catch (error) {
			Alert.alert(
				"Oops",
				"Erro ao registrar usuário, tente novamente mais tarde!"
			);
			console.log(error);
		}
	};

	return (
		<SafeAreaView style={{ padding: 16 }}>
			<Text style={{ fontSize: 24, marginBottom: 16 }}>Email</Text>

			<TextInput
				style={{
					marginBottom: 16,
					backgroundColor: "#f9f9f9",
					padding: 8,
					borderRadius: 4,
				}}
				placeholder="Email"
				onChangeText={(text) => setEmail(text)}
				defaultValue={email}
			/>
			<Text style={{ fontSize: 24, marginBottom: 16 }}>Senha</Text>
			<TextInput
				style={{
					marginBottom: 16,
					backgroundColor: "#f9f9f9",
					padding: 8,
					borderRadius: 4,
				}}
				placeholder="********"
				textContentType="password"
				onChangeText={(text) => setPassword(text)}
				defaultValue={password}
			/>

			<Pressable
				style={{
					backgroundColor: "rgb(59 7 100)",
					padding: 8,
					borderRadius: 4,
					alignItems: "center",
				}}
			>
				<Text style={{ color: "white" }} onPress={login}>
					Entrar
				</Text>
			</Pressable>
			<Link
				style={{ marginTop: 16, alignSelf: "center" }}
				href="/register"
			>
				Ainda não tenho conta.
			</Link>
		</SafeAreaView>
	);
};

export default Login;
