import * as WebBrowser from "expo-web-browser";
import * as React from "react";
var f = new Date();
console.log(
  f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + (f.getDate() - 1)
);
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { MonoText } from "../components/StyledText";

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
      "x-rapidapi-key": "7566623650mshc72222b7e573bfep112b5djsn1120ff4957f4",
    },
  }
)
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(
      f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + (f.getDate() - 5)
    );
    console.log(responseJson[0].provinces[0].confirmed);
    document.getElementById("hola").innerHTML = responseJson[0].country;
    document.getElementById("Confirmados").innerHTML =
      responseJson[0].provinces[0].confirmed;
    document.getElementById("Muertes").innerHTML =
      responseJson[0].provinces[0].deaths;
    document.getElementById("fecha").innerHTML =
      f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + (f.getDate() - 1);
  })
  .catch((error) => {
    console.error(error);
  });

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require("../assets/images/covid.png")
                : require("../assets/images/robot-prod.png")
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Text style={styles.getStartedText}>Fecha mas actual</Text>
          <Text style={styles.getStartedText} id="fecha">
            date
          </Text>

          <Text style={styles.getStartedText} id="hola3">
            Pais:
          </Text>

          <Text style={styles.getStartedText} id="hola"></Text>
        </View>
        <View>
          <Text style={styles.getStartedText}>Contagiados:</Text>
          <Text style={styles.getStartedText} id="Confirmados"></Text>
        </View>
        <View>
          <Text style={styles.getStartedText}>Defunciones:</Text>
          <Text style={styles.getStartedText} id="Muertes"></Text>
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Esta es una aplicacion para visualizar la informacion acerca de la
        pandemia Covid-19.
      </Text>
    );
  } else {
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "black",
    lineHeight: 24,
    textAlign: "center",
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
