import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@store_file'
var saveData = async (data) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    // console.log('Data successfully saved');
  } catch (e) {
    // console.log('Failed to save data');
    console.log(e)
  }
}


const readData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e)
    }
}

module.exports = {saveData, readData};