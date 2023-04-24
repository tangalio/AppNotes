import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/App/HomeScreen/HomeScreen';
import NoteSearch from '../screens/App/NoteSearch/NoteSearch';
import AddNotesItem from '../components/App/NoteForm/AddNotesItem';
import NoteListScreen from '../screens/App/NoteListScreen/NoteListScreen';
import NoteDetailScreen from '../screens/App/NoteDetailScreen/NoteDetailScreen';
import ShowImage from '../components/App/NoteListItem/ShowImage';
import PdfViewer from '../components/App/NoteListItem/PdfViewer';
import PdfDecode from '../screens/App/EncodeDecode/PdfViewer';
import Viewer from '../screens/App/EncodeDecode/Viewer';
import NotesSearchItem from '../screens/App/NoteSearch/NotesSearchItem';
const Stack = createStackNavigator();
const HomeNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NoteSearch"
                component={NoteSearch}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NotesSearchItem"
                component={NotesSearchItem}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NoteListScreen"
                component={NoteListScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddNotesItem"
                component={AddNotesItem}
            // options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NoteDetailScreen"
                component={NoteDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ShowImage"
                component={ShowImage}
            // options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PdfViewer"
                component={PdfViewer}
            // options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PdfDecode"
                component={PdfDecode}
            // options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Viewer"
                component={Viewer}
            />

        </Stack.Navigator>
    );
};

export default HomeNavigator;