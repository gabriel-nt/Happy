import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaUpload, FaEdit } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import '../styles/pages/orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from '../utils/mapIcon';
import api from "../services/api";
import { useParams, Link } from "react-router-dom";

export interface Orphanage {
  id: number;
  name: string,
  latitude: number,
  longitude: number,
  instructions: string,
  about: string,
  opening_hours: string,
  open_on_weekends: boolean,
  images: Array<{
    id: number;
    path: string;
    url: string
  }>
}

export interface OrphanageParams {
  id: string;
}

const Orphanage:React.FC = () => {
  const params = useParams<OrphanageParams>();

  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    async function loadOrphanage() {
      const response = await api.get(`/orphanages/${params.id}`);

      setOrphanage(response.data);
    }

    loadOrphanage();
  }, [params.id]);

  if (!orphanage) {
    return <p>Carregando...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image,index) => (
              <button 
                type="button" 
                className={activeImageIndex === index ? 'active': ''}
                key={image.id}
                onClick={() => { setActiveImageIndex(index)}}
              >
                <img src={image.url} alt={orphanage.name} />
              </button>
            ))}
            
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]}  />
              </Map>

              <footer>
                <a 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>

              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#ff6690" />
                  Não Atendemos <br />
                  fim de semana
                </div>
              ) }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>

            <Link to={`/orphanage/update/${orphanage.id}`} type="button" className="update-button">
              <FaEdit size={20} color="#FFF" />
              Atualizar
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}


export default Orphanage;