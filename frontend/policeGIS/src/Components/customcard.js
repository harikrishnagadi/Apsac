import React from 'react';
import { Card, View, Text} from 'react-native-ui-lib';


class customcard extends React.Component{
  construct(props){
    Super(props);
  }
  render(){
    return(
      <View flex paddingH-25 paddingT-60>
        <Card
          enableShadow={true}
          borderRadius={12}
          height={200}
          shadowType="dark40"
          onPress={this.props.function}>
          <Card.Image height={'100%'} />
          <View  paddingT-70 paddingL-20>
            <Text blue50 text30>
              {this.props.text}
            </Text>
          </View>
        </Card>
      </View>
    )
  }
}

export default customcard;
