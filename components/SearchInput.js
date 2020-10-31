import React ,{Component} from 'react';
import {Text,View,StyleSheet,KeyboardAvoidingView,TextInput} from'react-native';

export default class SearchInput extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      text:' ',
    };
  }
  
  handleChangeLocation=(text)=>{
    this.setState({text:text});
  }
  handleSubmitEditing=()=>{
    const {onSubmit} =this.props;//DESTRCUTURE  the component props and states
    const {text}=this.state;
    if(!text) return;
    onSubmit(text);
    this.setState({text: ' '});
  };
  render()
  {
    const {placeholder}=this.props;//DESTRUCTURE
    const {text}=this.state;
    return(
      <View style={styles.container}>
      
      
      <TextInput
        autoCorrect={false} 
         //value={text}
        placeholder={this.props.placeholder}
        placeholderTextColor="white"
      style={styles.txtInput}
      onChangeText={this.handleChangeLocation}
      onSubmitEditing={this.handleSubmitEditing}
      />
      </View>
      );
  }
}
const styles=StyleSheet.create({
  container:{
   
    justifyContent:"center",
    alignItems:"center",
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
  },
  txtInput:{
    backgroundColor:"#666",
    height:50,
    width:200,
   
    
    paddingHorizontal:5,
    alignSelf:"center"
  }
});