import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Keyboard from "./src/components/Keyboard";
import { colors } from "./src/constants";

export default function App() {
  // const rows = new Array(6).fill(
  //   new Array(5).fill("")
  // );
  const [rows, setRows] = React.useState([
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
  ]);

  const [position, setPosition] = React.useState({ row: 0, column: 0 });

  const copyArray = (arr: string[][]) => {
    return [...arr.map((rows) => [...rows])];
  };

  const onKeyPressed = (key: string) => {
    const updatedArr = copyArray(rows);

    if (position.column < rows[0].length) {
      updatedArr[position.row][position.column] = key;
      setRows(updatedArr);
      setPosition({ ...position, column: position.column + 1 });
    }

    if (key === "CLEAR") {
      clear();
    }
  };

  const next = () => {
    if (position.row === 0 && position.column === 5) {
      setPosition({ ...position, column: 0 });
      setPosition({ ...position, row: position.row + 1 });
      return;
    }
  };

  const clear = () => {
    setRows(new Array(6).fill(new Array(6).fill("")));
    setPosition({ ...position, column: 0, row: 0 });
  };

  const isCellActive = (row: number, col: number) => {
    return row === position.row && col === position.column;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.title}>WORDLE</Text>
      <View style={styles.map}>
        {rows.map((row, i) => (
          <View style={styles.row} key={`22 ${i}`}>
            {row.map((cell, j) => (
              <View
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(i, j)
                      ? colors.lightgrey
                      : colors.darkgrey,
                  },
                ]}
                key={`32 ${j}`}
              >
                <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <Keyboard onKeyPressed={onKeyPressed} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
  },
  map: {
    alignSelf: "stretch",
    height: 100,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    borderWidth: 3,
    borderColor: colors.darkgrey,
    flex: 1,
    aspectRatio: 1,
    margin: 3,
    maxWidth: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    color: colors.lightgrey,
  },
});
