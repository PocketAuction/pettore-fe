import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import { getNewPlace } from "@/api";
import { isSuccessApiCall } from "@/util/common";
import YScrollContent from "@/components/organisms/YScrollContent";

export default function HotPlace(){
	const [newPlace, setNewPlace] = useState([]);

	useEffect(() => {
		getNewPlace().then(res => {
			if (isSuccessApiCall(res.code)) {
				setNewPlace(res.data);
			}
		});
	}, [])

	return (
		<View>
			<YScrollContent list={newPlace} />
		</View>
	);
}
//
