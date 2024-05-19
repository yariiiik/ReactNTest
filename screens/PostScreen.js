import React, { useState } from "react";
import { View, Text, StyleSheet, Button,ImageBackground, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default function PostScreen() {
	const [cryptoData, setCryptoData] = useState("");

	const criptoprice = async () => {
		let coin1 = "BTC_USDT";
		let coin2 = "ETH_USDT";
		let coin3 = "WBT_USDT";
		let coin4 = "USDT_UAH";
		let coin5 = "USDT_CZK";

		try {
			const response = await fetch('https://whitebit.com/api/v1/public/tickers');
			// const response = await fetch('https://www.binance.com/api/v1/ticker/allBookTickers');
			console.log("function Trading Status response: ", response.status);
			const cripta = await response.json().catch(() => null);
			// console.log("cripta: ", cripta);
			let message = `${coin1.slice(0, 3) + ' / ' + coin1.slice(4)} => ${(+cripta.result[coin1].ticker.last).toFixed(2)}\n
			${coin2.slice(0, 3) + ' / ' + coin2.slice(4)} => ${(+cripta.result[coin2].ticker.last).toFixed(2)}\n
			${coin3.slice(0, 3) + ' / ' + coin3.slice(4)} => ${(+cripta.result[coin3].ticker.last).toFixed(2)}\n
			${coin4.slice(5) + ' / ' + coin4.slice(0, 4)} => ${(+cripta.result[coin4].ticker.last).toFixed(2)}\n
			${coin5.slice(5) + ' / ' + coin5.slice(0, 4)} => ${(+cripta.result[coin5].ticker.last).toFixed(2)}\n`;

			setCryptoData(message);
		} catch (error) {
			console.log("function Trading error ---> " + error.message);
			setCryptoData('Error ;-(');
		}
	}

	return (
			
			<View style={styles.backgroundWrapper}>
				<ImageBackground
					source={ require("../assets/3px-tile-520x260.png")}
					style={styles.backgroundImage}
					resizeMode="repeat"
				>
					<View style={styles.container}>
						<Text style={styles.text}>
							{cryptoData}
						</Text>
						<Button onPress={criptoprice} title="get cripto" />
					</View>
				</ImageBackground>
			</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	text: {
		fontSize: 20,
		fontWeight: "900",
		// fontFamily: "",
	},
	backgroundWrapper: {
		position: 'absolute',
		width: width,
		height: height,
	  },
	  backgroundImage: {
		width: '100%',
		height: '100%',
	  },
});
