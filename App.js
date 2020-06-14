import * as React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
var f = new Date();
console.log(
  f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + (f.getDate() - 1)
);
const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export default function App() {
  const [restaurant, setCovid] = React.useState([]);
  React.useEffect(() => {
    fetch(
      "https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=" +
        f.getFullYear() +
        "-" +
        (f.getMonth() + 1) +
        "-" +
        (f.getDate() - 1) +
        "&name=Mexico",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "x-rapidapi-key":
            "7566623650mshc72222b7e573bfep112b5djsn1120ff4957f4",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setCovid(responseJson[0].provinces);
        console.warn(responseJson[0].provinces);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.welcome}
        data={restaurant}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text style={styles.welcometitle}>Covid-19 en Mexico</Text>
            <Text style={styles.welcome}>Pais:</Text>
            <Text style={styles.instructions}>{item.province}</Text>
            <Text style={styles.welcome}>Confirmados:</Text>
            <Text style={styles.instructions}>{item.confirmed}</Text>
            <Text style={styles.welcome}>Defunciones:</Text>
            <Text style={styles.instructions}>{item.deaths}</Text>
            <Text style={styles.welcome}>Recuperados:</Text>
            <Text style={styles.instructions}>{item.recovered}</Text>
            <Text style={styles.welcome}>Activos:</Text>
            <Text style={styles.instructions}>{item.active}</Text>
            <Text style={styles.welcome}>Fecha de Actualizacion</Text>
            <Text style={styles.instructions}>
              {f.getFullYear() +
                "-" +
                (f.getMonth() + 1) +
                "-" +
                (f.getDate() - 1)}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  welcometitle: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "white",
    marginBottom: 5,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
});
