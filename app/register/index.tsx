import React, { useState } from "react";
import {
	SafeAreaView,
	Pressable,
	Alert,
	Text,
	TextInput,
	Button,
} from "react-native";
import { Link, router } from "expo-router";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const register = async () => {
		if (email === "" || password === "") {
			console.log("Preencha todos os campos");
			return;
		}

		if (password.length < 6) {
			Alert.alert("Oops", "A senha deve ter no mínimo 6 caracteres");
			return;
		}

		try {
			const response = await auth().createUserWithEmailAndPassword(
				email,
				password
			);

			if (response.user) {
				await createProfile(response);
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

	const createProfile = async (
		response: FirebaseAuthTypes.UserCredential
	) => {
		db().ref(`/users/${response.user?.uid}`).set({
			email: response.user?.email,
			uid: response.user?.uid,
		});
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
				<Text style={{ color: "white" }} onPress={register}>
					Registrar
				</Text>
			</Pressable>
			<Link style={{ marginTop: 16, alignSelf: "center" }} href="/">
				Já sou registrado.
			</Link>
		</SafeAreaView>
	);
};

export default Register;
