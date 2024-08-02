import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider";
import { TokenContext } from "@hooks/TokenContext";
import { parseISO, format, parse } from "date-fns";
import { launchImageLibrary } from "react-native-image-picker";

const UserEditScreen = ({ navigation }) => {
  const { token, user } = useContext(TokenContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [risk, setRisk] = useState(0);
  const [salary, setSalary] = useState("");
  const [variableIncome, setVariableIncome] = useState(0);
  const [fixedIncome, setFixedIncome] = useState(0);
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (user) {
      console.log("User data:", user);
      setName(user.name || "");
      setEmail(user.email || "");
      if (user.birthday) {
        try {
          const parsedBirthday = parseISO(user.birthday);
          setBirthday(format(parsedBirthday, "dd/MM/yyyy"));
        } catch (error) {
          console.error("Error parsing birthday:", error);
        }
      }
      setRisk(user.risk ? user.risk * 100 : 0);
      setSalary(user.salary ? user.salary.toString() : "");
      setVariableIncome(
        user.knowledge?.variable_income
          ? user.knowledge.variable_income * 100
          : 0
      );
      setFixedIncome(
        user.knowledge?.fixed_income ? user.knowledge.fixed_income * 100 : 0
      );
      setProfilePicture(user.picture);
      setLoading(false);
    } else {
      console.log("No user data available");
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!name || !email || !birthday || !salary || !password || !oldPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const parseBirthday = parse(birthday, "dd/MM/yyyy", new Date());
      const formattedBirthday = format(
        parseBirthday,
        "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
      );

      setLoading(true);

      const payload = {
        id: user.id,  // Certifique-se de que o ID do usuário está disponível
        name,
        email,
        password,
        old_password: oldPassword,
        birthday: formattedBirthday,
        risk: (risk / 100).toFixed(2),
        salary: parseFloat(salary).toFixed(2),
        knowledge: {
          variable_income: (variableIncome / 100).toFixed(2),
          fixed_income: (fixedIncome / 100).toFixed(2),
        },
        picture: profilePicture,
      };

      const updateResponse = await fetch(
        "https://fortuna-api.onrender.com/api/users",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const updateData = await updateResponse.json();

      if (!updateResponse.ok) {
        setResponseMessage(updateData.message || "Failed to update.");
        setLoading(false);
        return;
      }

      setResponseMessage("Dados atualizados com sucesso.");
      Alert.alert("Sucesso", "Dados atualizados com sucesso.");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error updating user:", error);
      setResponseMessage("Ocorreu um erro.");
      Alert.alert("Erro", "Ocorreu um erro.");
    } finally {
      setLoading(false);
    }
  };

  const formatBirthday = (text) => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = "";

    if (cleaned.length <= 2) {
      formatted = cleaned;
    } else if (cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(
        2,
        4
      )}/${cleaned.slice(4, 8)}`;
    }

    setBirthday(formatted);
  };

  const handleSalaryChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setSalary(numericValue);
  };

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.error("ImagePicker Error: ", response.error);
      } else if (response.assets && response.assets.length > 0) {
        setProfilePicture(response.assets[0].uri);
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8A2BE2" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Edite suas informações</Text>
        {profilePicture && (
          <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        )}
        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={handleSelectImage}
        >
          <Text style={styles.buttonText}>Selecionar Foto</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Seu email"
          value={email}
          onChangeText={setEmail}
        />
          <TextInput
            style={styles.input}
            placeholder="Senha antiga"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
          />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Data de nascimento (DD/MM/YYYY)"
          value={birthday}
          onChangeText={formatBirthday}
          maxLength={10}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Risco</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={risk}
          onValueChange={setRisk}
          minimumTrackTintColor="#9a67ea"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#9a67ea"
        />
        <Text style={styles.percentage}>{risk}%</Text>
        <TextInput
          style={styles.input}
          placeholder="Salário"
          value={salary}
          onChangeText={handleSalaryChange}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Conhecimento em:</Text>
        <Text style={styles.subLabel}>Renda Variável</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={variableIncome}
          onValueChange={setVariableIncome}
          minimumTrackTintColor="#9a67ea"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#9a67ea"
        />
        <Text style={styles.percentage}>{variableIncome}%</Text>
        <Text style={styles.subLabel}>Renda Fixa</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={fixedIncome}
          onValueChange={setFixedIncome}
          minimumTrackTintColor="#9a67ea"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#9a67ea"
        />
        <Text style={styles.percentage}>{fixedIncome}%</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Atualizar</Text>
          )}
        </TouchableOpacity>
        {responseMessage ? (
          <Text style={styles.responseMessage}>{responseMessage}</Text>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  formContainer: {
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flex: 1,
  },
  label: {
    fontSize: 18,
    color: "#000",
    marginBottom: 10,
  },
  subLabel: {
    fontSize: 16,
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 10,
  },
  percentage: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  responseMessage: {
    textAlign: "center",
    color: "red",
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#8A2BE2",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  imagePickerButton: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
});

export default UserEditScreen;