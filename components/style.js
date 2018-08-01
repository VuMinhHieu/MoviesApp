import { StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 200,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover'
	},
	icon_star: {fontSize:20, color:'#fffd16'},
	movieDetailWapper: {
		position: 'absolute',
		padding: 5,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#000',
		opacity: 0.8
	},
	movieDetailText: { color: '#fff', marginTop: 10 },
	movieDetailTitle: {
		fontWeight: '500',
		fontSize: 20
	},
	movieDetailDate:{
		marginTop: 5
	}
});