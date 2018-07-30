import React from 'react';
import { Text, Button, Icon, View } from 'native-base';

export default class Pagination extends React.Component {
	render() {
		return (
			<View style={{flexWrap: 'wrap', flexDirection:'row', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20,}}>
				{this.props.paged > 1 ?
					<Button onPress={()=>this.props._onPaging(this.props.paged-1)} info style={{marginRight:5}}>
						<Icon name='arrow-back' />
					</Button>
					: ""
				}
				{this.props.paged > 2 ?
					<Button onPress={()=>this.props._onPaging(this.props.paged-2)} info style={{marginRight:5}}><Text>{this.props.paged-2}</Text></Button>
					: ""
				}
				{this.props.paged > 1 ?
					<Button onPress={()=>this.props._onPaging(this.props.paged-1)} info style={{marginRight:5}}><Text>{this.props.paged-1}</Text></Button>
					: ""
				}

				<Button info bordered style={{marginRight:5}}><Text>{this.props.paged}</Text></Button>

				{this.props.paged < this.props.total_pages ?
					<Button onPress={()=>this.props._onPaging(this.props.paged+1)} info style={{marginRight:5}}><Text>{this.props.paged+1}</Text></Button>
					: ""
				}
				{this.props.paged < this.props.total_pages-1 ?
					<Button onPress={()=>this.props._onPaging(this.props.paged+2)} info style={{marginRight:5}}><Text>{this.props.paged+2}</Text></Button>
					: ""
				}
				{this.props.paged < this.props.total_pages ?
					<Button onPress={()=>this.props._onPaging(this.props.paged+1)} info>
						<Icon name='arrow-forward' />
					</Button>
					: ""
				}
			</View>
		);
	}
}
