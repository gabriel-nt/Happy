import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, Text,  Linking } from 'react-native';
import { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import mapMarkerImg from '../../images/map-marker.png';
import api from '../../services/api';
import { Schedule, Container, Details, Image, ImagesContainer, Title, Description, MapContainer, Map, RouteButton, RouteText, Separator, ScheduleItemBlue, ScheduleItemRed, ScheduleItemGreen, ScheduleTextGreen, ScheduleTextBlue, ScheduleTextRed, Contact, ContactText } from './styles';

interface OrphanageDetailsRouteParams {
  id: number;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>
}

const OrphanageDetails: React.FC = () => {
  const route = useRoute();
  const [orphanage, setOrphanage] = useState<Orphanage>();

  const { id } = route.params as OrphanageDetailsRouteParams;

  useEffect(() => {
    async function loadOrphanage() {
      const response = await api.get(`orphanages/${id}`);

      setOrphanage(response.data);
    }
    
    loadOrphanage();
  }, [id]);

  const handleOpenGoogleMapsRoutes = useCallback(() => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`)
  }, []);


  if (!orphanage) {
    return (
      <Container>
        <Description>Carregando...</Description>
      </Container>
    )
  }

  return (
    <Container>
      <ImagesContainer>
        <ScrollView horizontal pagingEnabled>
          {
            orphanage.images.map(image => (
              <Image 
                key={image.id}
                source={{ uri: image.url }} 
              />
            ))
          }
        </ScrollView>
      </ImagesContainer>

      <Details>
        <Title>{orphanage.name}</Title>
        <Description>{orphanage.about}</Description>
      
        <MapContainer>
          <Map 
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
          >
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ 
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            />
          </Map>

          <RouteButton onPress={handleOpenGoogleMapsRoutes}>
            <RouteText>Ver rotas no Google Maps</RouteText>
          </RouteButton>
        </MapContainer>
      
        <Separator/>

        <Title>Instruções para visita</Title>
        <Description>{orphanage.instructions}</Description>

        <Schedule>
          <ScheduleItemBlue>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <ScheduleTextBlue>Segunda à Sexta {orphanage.opening_hours}</ScheduleTextBlue>
          </ScheduleItemBlue>

          {
            orphanage.open_on_weekends ? (
            <ScheduleItemGreen>
              <Feather name="info" size={40} color="#39CC83" />
              <ScheduleTextGreen>Atendemos fim de semana</ScheduleTextGreen>
            </ScheduleItemGreen>
            ) : (
              <ScheduleItemRed>
                <Feather name="info" size={40} color="#ff669d" />
                <ScheduleTextRed>Não atendemos fim de semana</ScheduleTextRed>
              </ScheduleItemRed>
            )
          }
          
        </Schedule>

        <Contact onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <ContactText>Entrar em contato</ContactText>
        </Contact>
      </Details>
    </Container>
  )
}

export default OrphanageDetails;