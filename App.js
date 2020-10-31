
import React ,{Component} from 'react';
import {Text,View,StyleSheet,KeyboardAvoidingView,TextInput,ImageBackground,ActivityIndicator,StatusBar} from'react-native';
import SearchInput from './components/SearchInput';
import getImage from'./utils/getImage';
import {fetchLocationId, fetchWeather} from './utils/api';
export default class App extends Component
{
 
 constructor(props){
  super(props);
  this.state = {
    loading:false,
     error:false,
    location:' ',
    temperature:0,
    weather:' ',
  };
 }
 componentDidMount()
 {
  this.handleUpdateLocation('New Delhi');
}
 handleUpdateLocation= async city => {
  if(!city) return;

  this.setState({ loading: true }, async()=>{
      try{
        const locationId = await fetchLocationId(city);
        const { location,weather,temperature } = await fetchWeather(
          locationId,
          );

        this.setState({
          loading:false,
          error:false,
          location,
          weather,
          temperature,
        });
      } catch(e) {
        this.setState({
          loading:false,
          error:true,
        });
      }
      
  });
 };
  render()
  {
    const {location,loading,error,temperature,weather} =this.state;
    return(
      <View style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImage(weather)}
        style={styles.imageContainer}
        imageStyle={styles.images} 
        >
        <View style={styles.detail}>
        <ActivityIndicator animating={loading} color="white" size="large" />
        {!loading && (
          <View >
          {error && (<Text style={[styles.smallText,styles.txtStyle]}>
              Could not load Weather.
              </Text>
            )}
            {!error &&(
              <View>
              <Text style={[styles.largeText,styles.txtStyle]}>
      {location}
      </Text>
      <Text style={[styles.smallText,styles.txtStyle]}>
      {weather}
      </Text>
      <Text style={[styles.largeText,styles.txtStyle]}>
      {`${Math.round(temperature)}`}
      </Text>
      </View>
              )}
      <SearchInput
        placeholder="Search City"
        onSubmit={this.handleUpdateLocation}
      />
      </View>
          )}
      
          </View>
  </ImageBackground>
 </View>
      );
}
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    
    backgroundColor:"#fff",
  },
  largeText:{
    fontSize:44,
  },
   smallText:{
    fontSize:20,
  },
  txtStyle:{

    textAlign:"center",
    fontFamily:"Roboto",
    color:"white"
  },
  txtInput:{
    backgroundColor:"#fff",
    height:50,
    width:200,
    marginTop:5,
    marginHorizontal:5,
    paddingHorizontal:5,
   alignSelf:"center"
  },
  imageContainer:{
    flex:1,

  },
  images:{
    height:null,
    width:null,
    flex:1,
    resizeMode:"cover",
  },
  detail:{
    justifyContent:"center",
    flex:1,

    alignItems:"center",
    


  }
});

