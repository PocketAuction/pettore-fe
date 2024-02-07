import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getHotPlace } from "@/api";
import { isSuccessApiCall } from "@/util/common";
import YScrollContent from "@/components/organisms/YScrollContent";

export default function HotPlace(){
	const [hotPlace, setHotPlace] = useState([]);

	useEffect(() => {
		getHotPlace().then(res => {
			if (isSuccessApiCall(res.code)) {
				setHotPlace(res.data);
			}
		});
	}, [])

	return (
		<View>
			<YScrollContent list={hotPlace} isShowScore={true} />
		</View>
	);
}
//
