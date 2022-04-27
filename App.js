//Author: Jiefang Li
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Provider as PaperProvider, Checkbox } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from './components/About';
import ItemDetail  from './components/ItemDetail';
import { AntDesign } from '@expo/vector-icons';
import {TouchableOpacity, FlatList} from "react-native";
import React, { useState, useEffect} from 'react';
import moment from 'moment';

const Root = createNativeStackNavigator();

//the main function that displaying the app
export default function App() {

  return (
    <PaperProvider>
      <NavigationContainer style={styles.container}>
        <Root.Navigator>
          <Root.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                headerRight: () => (
                  <View style={styles.right}>
                    <TouchableOpacity style={styles.right} onPress={() => navigation.navigate('About')}>
                      <Text style={styles.text}>About</Text>
                      <AntDesign name="infocirlce" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  
                )
                }
            )} />
          <Root.Screen name={"About"} component={About}/>
          <Root.Screen name={"Item Detail"} component={ItemDetail}/>
        </Root.Navigator>
      </NavigationContainer>
    </PaperProvider>
    
  );
  
}

//the main home function for displaying content on the home screen
function Home() {

  //initialize states 
  const todoJson = require("./todos.json").todo; 
  const [num, setNum] = useState(0);
  const[todos, setTodo] = useState([]);
  const [newToDo, setNew] = useState(false);
  const result = todos.filter(todo => todo.done === false);
  const [mark,setMark] = useState(false);

  // Item function for displaying single item
  const Item = ({ title }) => (
    <View style>
      <Text >{title}</Text>
    </View>
  );

  
  useEffect(() => {
    setTodo(todoJson)
  }, [])

  //function for mark item done or undo the marking based on the item current state
  function markItemDone(index){
    let todoCopy = todos;
    todoCopy[index].done = !todoCopy[index].done;
    setTodo(todoCopy);
    setNew(!newToDo);
  }

  //function for rendering item based on whether it has been checked or not 
  const renderItem = ({ item }) => (
    <View style = {styles.line}>
      <Checkbox
      status={item.done? "checked" : "unchecked"}
        onPress={() => {
          markItemDone(todos.indexOf(item));
        }}
      />
      <Text>{item.name}</Text>
      <Text>  {moment(item.due).format("ddd, MM Do YYYY")}</Text>
      <Text>  {moment(item.due).fromNow()}</Text>
    </View>
  );

//content for rendering on home page
  return (
      <View style={styles.container}>
        
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />

        <Text>Num is {num}</Text>
        <Button mode={"contained"} onPress={() => setNum((num + 1 ))}>
          Increase num by 1.
        </Button>
        <Button mode={"contained"} onPress={() => setNum((num - 1 ))}>
          Decrease num by 1.
        </Button>
        <Button mode={"contained"} onPress={() => setNum((0))}>
          Reset number to 0.
        </Button>
        <View style={styles.list}>
          <FlatList
            data={mark? todos:result}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            extraData = {newToDo}
          />
        </View>
         <Button mode={"contained"} onPress={() => setMark(!mark)}>
          Show or Hide Checked-off Items
        </Button>
      </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  right:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  text:{
    letterSpacing: 2,
    fontSize: 18,
  },
  buttons:{
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  line:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  list:{
    height:200,
  }
});


