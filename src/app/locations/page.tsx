"use client";

import { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

const pharmacies: Pharmacy[] = [
  {
    id: "1",
    name: "Main Street Pharmacy",
    address: "123 Main St, Healthcare City, HC 12345",
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: "2",
    name: "Downtown Pharmacy",
    address: "456 Market St, Healthcare City, HC 12345",
    lat: 37.7833,
    lng: -122.4167,
  },
  {
    id: "3",
    name: "Westside Pharmacy",
    address: "789 West Ave, Healthcare City, HC 12345",
    lat: 37.7739,
    lng: -122.4312,
  },
];

export default function LocationsPage() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
    null
  );

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
    });

    loader.load().then(() => {
      // Get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            setUserLocation({ lat: userLat, lng: userLng });

            // Initialize map
            const mapInstance = new google.maps.Map(
              document.getElementById("map") as HTMLElement,
              {
                center: { lat: userLat, lng: userLng },
                zoom: 13,
              }
            );

            // Add user location marker
            new google.maps.Marker({
              position: { lat: userLat, lng: userLng },
              map: mapInstance,
              title: "Your Location",
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              },
            });

            // Add pharmacy markers
            pharmacies.forEach((pharmacy) => {
              const marker = new google.maps.Marker({
                position: { lat: pharmacy.lat, lng: pharmacy.lng },
                map: mapInstance,
                title: pharmacy.name,
              });

              // Add click listener to marker
              marker.addListener("click", () => {
                setSelectedPharmacy(pharmacy);
              });
            });

            setMap(mapInstance);
          },
          (error) => {
            console.error("Error getting location:", error);
            // Initialize map with default center if location access is denied
            const mapInstance = new google.maps.Map(
              document.getElementById("map") as HTMLElement,
              {
                center: { lat: 37.7749, lng: -122.4194 },
                zoom: 13,
              }
            );
            setMap(mapInstance);
          }
        );
      }
    });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Find a Pharmacy Near You
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Locate the nearest pharmacy to your current location. We have
            multiple locations across the city to serve you better.
          </p>
          {userLocation && (
            <p className="mt-4 text-sm text-gray-500">
              Your location: {userLocation.lat.toFixed(4)},{" "}
              {userLocation.lng.toFixed(4)}
            </p>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div id="map" className="h-[600px] w-full rounded-lg shadow-lg" />
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Nearby Pharmacies
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {pharmacies.map((pharmacy) => (
                  <li
                    key={pharmacy.id}
                    className={`cursor-pointer rounded-lg p-4 ${
                      selectedPharmacy?.id === pharmacy.id
                        ? "bg-primary-50 ring-1 ring-primary-600"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedPharmacy(pharmacy)}
                  >
                    <h4 className="text-base font-medium text-gray-900">
                      {pharmacy.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {pharmacy.address}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {selectedPharmacy && (
              <div className="mt-6 rounded-lg bg-gray-50 p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Selected Pharmacy
                </h3>
                <div className="mt-4">
                  <h4 className="text-base font-medium text-gray-900">
                    {selectedPharmacy.name}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {selectedPharmacy.address}
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                      onClick={() => {
                        if (map) {
                          map.setCenter({
                            lat: selectedPharmacy.lat,
                            lng: selectedPharmacy.lng,
                          });
                          map.setZoom(15);
                        }
                      }}
                    >
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
