
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';


class App  extends Component {
  constructor(){
    super();
    this.state = {
      resultText:"",
      calculationText:""
    }
    this.operations = ['DEL','C','/','*','-','+'];
  }

  // changeOutput = () =>{
  //   this.setState({
  //     resultText: this.state.calculationText,
  //     calculateResult:""
  //   })
  // }
  calculateResult = () =>{
    let ans = eval(this.state.resultText);
    this.setState({
      calculationText: ans,
    })
    
  }
  validate = () =>{
    switch(this.state.resultText.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
    return true;
  }

   buttonPressed = (text)=>{
    if(text === '='){
      return this.validate() && this.calculateResult();
      
    }
    
    if(text !== 'C')
      this.setState({
        resultText: this.state.resultText +  text
      })
    
   }

   operate = (operation) =>{
    switch(operation){
      case 'DEL':
        if(this.state.resultText == "" )  return;
        let text = this.state.resultText.split('');
        text.pop();
        this.setState({ resultText: text.join('')})
        break
      case 'C':
          this.setState({
            resultText:"",
            calculationText:""
          })
        break
      case '+':
      case '-':
      case '*':
      case '/':
        let lastChar = this.state.resultText.split('').pop();
        if(this.operations.indexOf(lastChar) > 0) return;
        if(this.state.resultText == "" )  return;
        this.setState({ resultText: this.state.resultText + operation})

    }
   }
  render(){
  let rows = [];
  let nums =[[7,8,9],[4,5,6],[1,2,3],['.',0,'=']]; 
  for(let i = 0; i<4; i++){
    let row=[];
    for(let j = 0; j<3; j++){     
      row.push(<TouchableOpacity key={nums[i][j]} onPress={()=>this.buttonPressed(nums[i][j])}  style={styles.btn}><Text style={styles.btnText}>{nums[i][j]}</Text></TouchableOpacity>) 
    }
    rows.push(<View key={i} style={styles.row}>{row}</View>)
  }

  
  let ops =[];
  for(let i = 0; i<6; i++){
  ops.push(<TouchableOpacity key={this.operations[i]} onPress={()=>this.operate(this.operations[i])}  style={styles.btn}><Text style={[styles.btnText, styles.white]}>{this.operations[i]}</Text></TouchableOpacity>)
  }
  return ( 
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.resultText}>{this.state.resultText}</Text>
      </View>
      <View style={styles.calculation}>
        <Text style={styles.calculationText}>{this.state.calculationText}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.numbers}>
          {rows}
        </View>
        <View style={styles.operatons}>
          {ops}
        </View>
      </View>
    </View>
  );
}
};

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  result:{
    flex: 2,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'flex-end',
    paddingRight:5
  },
  btn:{
    flex:1,
    alignItems:'center',
    alignSelf:'stretch',
    justifyContent:'center'
  },
  btnText:{
    fontSize:35,
    color:'white'
  },
  white:{
    color:'white'
  },
  row:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-around',
    alignItems:'center'
  },
  calculation:{
    flex:1,
    backgroundColor:'#b2b2b2',
    justifyContent:'center',
    paddingRight:5,
    alignItems:'flex-end',
  },
  resultText:{
    color:'black',
    fontSize:35
  },
  calculationText:{
    color:'black',
    fontSize:27
  },
  buttons:{
    flex:7,
    // backgroundColor:'violet',
    flexDirection:'row'
  },
  numbers:{
    flex:3,
    backgroundColor:'#434343'
  },
  operatons:{
    flex:1,
    justifyContent:'space-around',
    backgroundColor:'#636363'
  },
});

export default App;
