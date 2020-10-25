import React, { useCallback, useState } from 'react';
import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'
import mapMarker from '../../images/map-marker.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';
import { Map, FooterText, Footer, CalloutText, CalloutContainer, CreateButton, Container } from './styles';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    async function loadOrphanages() {
      const response = await api.get('/orphanages');

      setOrphanages(response.data);
    }

    loadOrphanages();
  });

  const handleNavigateToCreateOrphanage = useCallback(() => {
    navigation.navigate('SelectMapPosition');
  }, []);

  const handleNavigateToDetails = useCallback((id: number) => {
    navigation.navigate('OrphanagesDetails', { id });
  }, []);

  return (
    <Container>
      <Map 
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: -29.647332,
        longitude: -50.7829654,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008
      }}
      >
        {orphanages.map(orphanage => (
          <Marker 
            key={orphanage.id}
            calloutAnchor={{
              x: 2.7,
              y: 0.8
            }}
            icon={mapMarker}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
          >
            <Callout tooltip onPress={() => { handleNavigateToDetails(orphanage.id) }}>
              <CalloutContainer>
                <CalloutText>{orphanage.name}</CalloutText>
              </CalloutContainer>
            </Callout>
          </Marker>
        ))}
      </Map>

      <Footer>
          <FooterText >{orphanages.length} orfanatos encontrados</FooterText>

          <CreateButton onPress={handleNavigateToCreateOrphanage}>
            <Feather name="plus" size={20} color="#fff" />
          </CreateButton>
      </Footer>
    </Container>
  )
}

export default OrphanagesMap;