import React, { useEffect, useState } from "react";
import {
	Alert,
	View,
	Text,
	TextInput,
	Button,
	FlatList,
	Pressable,
} from "react-native";
import {
	collection,
	doc,
	setDoc,
	getDocs,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

import { Icon } from "react-native-vector-icons/Icon";

interface GroceryItem {
	id: string;
	name: string;
}

const Home = () => {
	const [groceries, setGroceries] = useState<GroceryItem[]>([]);
	const [currentName, setCurrentName] = useState<string>("");
	const [currentId, setCurrentId] = useState<string>("");

	useEffect(() => {
		// Get all groceries from firebase
		getAllGroceries();
	}, []);

	const getAllGroceries = async () => {
		const groceriesCollection = collection(db, "groceries");
		const groceriesSnapshot = await getDocs(groceriesCollection);
		setGroceries(
			groceriesSnapshot.docs.map((doc) => ({
				id: doc.id,
				name: doc.data().name,
			}))
		);
	};

	const handleGrocery = async (newItem: GroceryItem): Promise<any> => {
		try {
			const res = await setDoc(doc(db, "groceries", newItem.id), {
				id: newItem.id,
				name: newItem.name,
			});

			return res;
		} catch (error: any) {
			console.log(error);
			Alert.alert("Erro", "Erro ao adicionar produto");
		}
	};

	const handleAddOrUpdate = async () => {
		if (currentName === "") {
			Alert.alert("Erro", "Nome do produto não pode ser vazio");
			return;
		}

		const id =
			currentId !== ""
				? currentId
				: groceries.length.toString() + currentName.length.toString();
		try {
			const newItem = {
				id: id,
				name: currentName,
			};

			await handleGrocery(newItem);

			if (currentId !== "") {
				const index = groceries.findIndex(
					(item) => item.id === currentId
				);
				groceries[index] = newItem;
			} else {
				setGroceries([...groceries, newItem]);
			}
		} catch (error) {
			console.log(error);
		}

		setCurrentName("");
		setCurrentId("");
	};

	const handleEdit = (item: GroceryItem) => {
		setCurrentId(item.id);
		setCurrentName(item.name);
	};

	const handleDelete = async (id: string) => {
		await deleteDoc(doc(db, "groceries", id.toString()));

		setGroceries(groceries.filter((item) => item.id !== id));
	};

	const renderItem = ({ item }: { item: GroceryItem }) => (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				marginVertical: 8,
				padding: 8,
			}}
		>
			<Text>{item.name}</Text>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 8,
				}}
			>
				<Pressable
					style={{
						backgroundColor: "rgb(59 7 100)",
						padding: 8,
						borderRadius: 4,
						alignItems: "center",
					}}
					onPress={() => handleEdit(item)}
				>
					<Text style={{ color: "white" }}>Editar</Text>
				</Pressable>
				<Pressable
					style={{
						backgroundColor: "rgb(59 7 100)",
						padding: 8,
						borderRadius: 4,
						alignItems: "center",
					}}
					onPress={() => handleDelete(item.id)}
				>
					<Text style={{ color: "white" }}>Deletar</Text>
				</Pressable>
			</View>
		</View>
	);

	return (
		<View>
			<TextInput
				placeholder="Nome do produto"
				style={{
					borderWidth: 1,
					borderColor: "#253057",
					borderRadius: 4,
					padding: 8,
					margin: 8,
				}}
				value={currentName}
				onChangeText={setCurrentName}
			/>
			<Pressable
				style={{
					backgroundColor: "rgb(59 7 100)",

					padding: 8,
					margin: 8,
					borderRadius: 4,
					alignItems: "center",
				}}
			>
				<Text
					style={{ color: "white", fontWeight: 600 }}
					onPress={handleAddOrUpdate}
				>
					{currentId !== "" ? "Atualizar" : "Adicionar"}
				</Text>
			</Pressable>

			<FlatList
				data={groceries}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
};

export default Home;
