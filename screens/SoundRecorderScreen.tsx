import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

const background = require("../assets/background.png");

type SoundProp = {
  navigation: StackNavigationProp<any>
};

interface RecordingData {
  sound: Audio.Sound;
  duration: string;
  file: string | null;
}

const SoundRecorderScreen: React.FC<SoundProp> = ({ navigation }) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordings, setRecordings] = useState<RecordingData[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    loadRecordings();
  }, []);

  const playRecordFile = async (recordFile: RecordingData): Promise<void> => {
    const playObject = new Audio.Sound();
    if (recordFile.file != null) {
      await playObject.loadAsync({ uri: recordFile.file });
      await playObject.playAsync();
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('recordings');
      setRecordings([]);
    } catch (e) {
    }
  };

  const loadRecordings = async () => {
    try {
      const savedRecordings = await AsyncStorage.getItem('recordings');
      if (savedRecordings !== null) {
        setRecordings(JSON.parse(savedRecordings));
      }
    } catch (error) {
      console.error('Error loading recordings', error);
    }
  };

  const saveRecordings = async () => {
    try {
      await AsyncStorage.setItem('recordings', JSON.stringify(recordings));
    } catch (error) {
      console.error('Error saving recordings', error);
    }
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const newRecording = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(newRecording.recording);
      } else {
        setMessage("Please grant permission to access the microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) {
      return;
    }

    await recording.stopAndUnloadAsync();
    const { sound, status } = await recording.createNewLoadedSoundAsync();

    if ("durationMillis" in status) {
      const newRecording = {
        sound: sound,
        duration: getDurationFormatted(status.durationMillis!),
        file: recording.getURI()
      };

      setRecordings(prevRecordings => [...prevRecordings, newRecording]);
    }

    setRecording(null);
  };

  useEffect(() => {
    if (recordings.length > 0) {
      saveRecordings();
    }
  }, [recordings]);

  const getDurationFormatted = (millis: number) => {
    const minutes = Math.floor(millis / 1000 / 60);
    const seconds = Math.round((millis / 1000) % 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${secondsDisplay}`;
  };

  const getRecordingLines = () => recordings.map((recordingLine, index) => (
    <View key={index} style={styles.row}>
      <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
      <Button onPress={() => playRecordFile(recordingLine)} title="Play" />
    </View>
  ));

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode='cover' style={styles.backgroundImage}>
        <View style={styles.viewContent}>
          <Text style={styles.titleText}>Sound Recorder</Text>
          <Text style={styles.messageText}>{message}</Text>
          <Button
            title={recording ? 'Stop Recording' : 'Start Recording'}
            onPress={recording ? stopRecording : startRecording} />
          {getRecordingLines()}
          <Button title="Remove All" onPress={removeValue} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SoundRecorderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  viewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  messageText: {
    color: '#DDD',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#222',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  fill: {
    color: '#FFF',
    flex: 1,
  },
});
