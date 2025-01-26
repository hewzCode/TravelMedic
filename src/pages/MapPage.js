import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  FaLocationArrow,
  FaHome,
  FaChevronUp,
  FaChevronDown,
  FaTrash,
} from 'react-icons/fa';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

const DEFAULT_CENTER = { lat: 32.9857, lng: -96.7501 };

function MapPage() {
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  // Control panel visibility
  const [panelVisible, setPanelVisible] = useState(true);

  const originRef = useRef();
  const destinationRef = useRef();

  if (!isLoaded) {
    return <Skeleton height="20px" my="4" />;
  }

  /**
   * Calculate route and fit it into view
   */
  async function calculateRoute() {
    if (!window.google || !window.google.maps) {
      console.error('Google Maps API is not available yet.');
      return;
    }
    if (!originRef.current.value || !destinationRef.current.value) {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    try {
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);

      // Fit the route so everything is visible
      if (map && results.routes[0]) {
        const bounds = new window.google.maps.LatLngBounds();
        results.routes[0].overview_path.forEach((point) => bounds.extend(point));
        map.fitBounds(bounds, {
          padding: { top: 200, bottom: 50, left: 50, right: 50 },
        });
      }
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  }

  /**
   * Clear the displayed route
   */
  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    if (originRef.current) originRef.current.value = '';
    if (destinationRef.current) destinationRef.current.value = '';
  }

  /**
   * Geolocate user, pan map, and optionally fill origin
   */
  function locateUser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userCoords);

          if (map) {
            map.panTo(userCoords);
            map.setZoom(15);
          }

          // Reverse geocode to fill Origin field
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: userCoords }, (results, status) => {
            if (status === 'OK' && results[0]) {
              if (originRef.current) {
                originRef.current.value = results[0].formatted_address;
              }
            }
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Could not get your location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  /**
   * Center map on default coords
   */
  function centerMap() {
    if (map) {
      map.panTo(DEFAULT_CENTER);
      map.setZoom(15);
    }
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      {/* MAP */}
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        <GoogleMap
          center={userLocation || DEFAULT_CENTER}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          <Marker position={userLocation || DEFAULT_CENTER} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </Box>

      {/* If panel is hidden, show "Show Panel" button (fixed) */}
      {!panelVisible && (
        <IconButton
          aria-label="Show Panel"
          icon={<FaChevronUp />}
          position="fixed"
          bottom={4}
          right={4}
          zIndex={9999}
          bg="#7f5af0"
          color="white"
          _hover={{ bg: '#6a48cc' }}
          onClick={() => setPanelVisible(true)}
        />
      )}

      {panelVisible && (
        <Box
          bgColor="rgba(255, 255, 255, 0.9)" // Less transparent -> more visible
          borderRadius="lg"
          boxShadow="xl"
          p={3}
          m={3}
          w="85%"
          maxW="350px"
          zIndex={2}
        >
          <VStack spacing={3} align="stretch">
            {/* Top row: Return to Dashboard & hide panel */}
            <HStack justifyContent="space-between" w="full">
              <Button
                bg="#7f5af0"
                color="white"
                _hover={{ bg: '#6a48cc' }}
                onClick={() => navigate('/dashboard')}
              >
                Return to Dashboard
              </Button>
              {/* Hide Panel Button (FaChevronDown now) */}
              <IconButton
                aria-label="Hide Panel"
                icon={<FaChevronDown />}
                bg="#7f5af0"
                color="white"
                _hover={{ bg: '#6a48cc' }}
                onClick={() => setPanelVisible(false)}
              />
            </HStack>

            {/* ORIGIN / DESTINATION FIELDS */}
            <HStack spacing={2} w="full">
              <Autocomplete>
                <Input placeholder="Origin" ref={originRef} />
              </Autocomplete>
              <Autocomplete>
                <Input placeholder="Destination" ref={destinationRef} />
              </Autocomplete>
            </HStack>

            {/* ROUTE BUTTONS */}
            <ButtonGroup w="full" justifyContent="center">
              <Button
                bg="#7f5af0"
                color="white"
                _hover={{ bg: '#6a48cc' }}
                onClick={calculateRoute}
              >
                Calculate Route
              </Button>
              <IconButton
                aria-label="Clear route"
                icon={<FaTrash />} // changed to trash
                bg="#7f5af0"
                color="white"
                _hover={{ bg: '#6a48cc' }}
                onClick={clearRoute}
              />
            </ButtonGroup>

            {/* DISTANCE & DURATION */}
            <HStack w="full" justifyContent="space-between">
              <Text fontSize="sm">Distance: {distance}</Text>
              <Text fontSize="sm">Duration: {duration}</Text>
            </HStack>

            {/* MAP CONTROLS */}
            <HStack w="full" justifyContent="space-between">
              <IconButton
                aria-label="Center Map"
                icon={<FaHome />}
                bg="#7f5af0"
                color="white"
                _hover={{ bg: '#6a48cc' }}
                isRound
                onClick={centerMap}
              />
              <IconButton
                aria-label="Locate Me"
                icon={<FaLocationArrow />}
                bg="#7f5af0"
                color="white"
                _hover={{ bg: '#6a48cc' }}
                isRound
                onClick={locateUser}
              />
            </HStack>
          </VStack>
        </Box>
      )}
    </Flex>
  );
}

export default MapPage;
