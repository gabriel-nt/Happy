import React, {
  useCallback,
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
} from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory, useParams } from 'react-router-dom';

import { FiPlus, FiX } from 'react-icons/fi';
import { Orphanage, OrphanageParams } from '../Orphanage';

import { Container, Form, Select, Button } from '../CreateOrphanage/styles';

import Sidebar from '../../components/Sidebar';

import mapIcon from '../../utils/mapIcon';
import api from '../../services/api';

interface Image {
  id: number;
  path: string;
  url: string;
}

export default function UpdateOrphanage() {
  const history = useHistory();
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();

  const [images, setImages] = useState<File[]>([]);
  const [imagesDeleted, setImagesDeleted] = useState<string[]>([]);
  const [imagesExists, setImagesExists] = useState<Image[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  useEffect(() => {
    async function loadOrphanage() {
      const response = await api.get<Orphanage>(`/orphanages/${params.id}`);

      setPosition({
        latitude: response.data.latitude,
        longitude: response.data.longitude,
      });

      setName(response.data.name);
      setAbout(response.data.about);
      setOrphanage(response.data);
      setImagesExists(response.data.images);
      setInstructions(response.data.instructions);
      setOpeningHours(response.data.opening_hours);
      setOpenOnWeekends(response.data.open_on_weekends);
    }

    loadOrphanage();
  }, [params.id]);

  const handleDeleteImage = useCallback(
    (key: number) => {
      const updateImages = images.filter((image, index) => {
        return index !== key;
      });

      const updatePreviewImages = previewImages.filter((image, index) => {
        return index !== key;
      });

      setImages(updateImages);
      setPreviewImages(updatePreviewImages);
    },
    [images, previewImages],
  );

  const handleDeleteImageExist = useCallback(
    (id: number) => {
      const findImage = imagesExists.find(image => {
        return image.id === id;
      });

      if (!findImage) {
        return;
      }

      setImagesDeleted([...imagesDeleted, findImage.path]);

      const updateImages = imagesExists.filter(image => {
        return image.id !== id;
      });

      setImagesExists(updateImages);
    },
    [imagesDeleted, imagesExists],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const { latitude, longitude } = position;

      const data = new FormData();

      data.append('name', name);
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('about', about);
      data.append('instructions', instructions);
      data.append('open_on_weekends', String(open_on_weekends));
      data.append('opening_hours', opening_hours);

      images.forEach(image => {
        data.append('images', image);
      });

      imagesDeleted.forEach(image => {
        data.append('images_deleted', image);
      });

      await api.put(`orphanages/${params.id}`, data);

      alert('Orfanato atualizado com Sucesso!');

      history.push('/app');
    },
    [
      about,
      history,
      images,
      imagesDeleted,
      instructions,
      name,
      open_on_weekends,
      opening_hours,
      params.id,
      position,
    ],
  );

  const handleSelectImage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      const selectedImages = Array.from(event.target.files);

      setImages([...images, ...selectedImages]);

      const selectedImagesPreview = selectedImages.map(image => {
        return URL.createObjectURL(image);
      });

      setPreviewImages([...previewImages, ...selectedImagesPreview]);
    },
    [images, previewImages],
  );

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }, []);

  if (!orphanage) {
    return <h1>Carregando</h1>;
  }

  return (
    <Container>
      <Sidebar />

      <main>
        <Form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[orphanage.latitude, orphanage.longitude]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre
                <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => (
                  <div className="image" key={image}>
                    <FiX
                      color="#FF669D"
                      onClick={() => handleDeleteImage(index)}
                    />
                    <img src={image} alt={name} />
                  </div>
                ))}

                {imagesExists.map((image, index) => (
                  <div className="image" key={image.id}>
                    <FiX
                      color="#FF669D"
                      onClick={() => handleDeleteImageExist(image.id)}
                    />
                    <img src={image.url} alt={name} />
                  </div>
                ))}

                <label className="new-image" htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input
                type="file"
                multiple
                id="image[]"
                onChange={handleSelectImage}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <Select>
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => {
                    setOpenOnWeekends(true);
                  }}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => {
                    setOpenOnWeekends(false);
                  }}
                >
                  Não
                </button>
              </Select>
            </div>
          </fieldset>

          <Button type="submit">Confirmar</Button>
        </Form>
      </main>
    </Container>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
