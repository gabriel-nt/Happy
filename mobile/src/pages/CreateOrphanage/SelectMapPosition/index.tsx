import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Marker, MapEvent } from 'react-native-maps';

import mapMarkerImg from '../../../images/map-marker.png';

import {Container, Map, NextButton, NextButtonText} from './styles';

const SelectMapPosition: React.FC = () => {
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  });

  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  const handleSelectMapPosition = useCallback((event: MapEvent) => {
    setPosition(event.nativeEvent.coordinate);
  }, []);

  return (
    <Container>
      <Map 
        initialRegion={{
          latitude: -29.647332,
          longitude: -50.7829654,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        onPress={handleSelectMapPosition}
      >
        { position.latitude !== 0 && (
          <Marker 
            icon={mapMarkerImg}
            coordinate={{ latitude: position.latitude, longitude: position.longitude }}
          />
        )}
        
      </Map>

      { position.latitude !== 0 && (
        <NextButton onPress={handleNextStep}>
          <NextButtonText>Próximo</NextButtonText>
        </NextButton>
      )}
      
    </Container>
  )
}

export default SelectMapPosition;

