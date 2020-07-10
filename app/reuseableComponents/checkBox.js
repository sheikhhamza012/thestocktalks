import React, { Component } from 'react';
import {View,TouchableOpacity} from 'react-native';
import styles from '../styles'
import Text from '../reuseableComponents/Text'

class App extends Component {
    state = { 
        isChecked:this.props.isChecked
    }
    onPress=()=>{
        this.setState({isChecked:!this.state.isChecked},
            this.props.onPress(this.props.isChecked))
    }
    render() { 
        return (
            <TouchableOpacity onPress={this.onPress} style={{flexDirection:"row",alignItems:"center"}}>
                <View style={styles.checkBox.container}>    
                    {this.props.isChecked&&
                        <View style={styles.checkBox.body}/>
                    }
                </View>
                <Text style={styles.checkBox.label}>{this.props.text}</Text>
            </TouchableOpacity>
          );
    }
}
 
export default App;