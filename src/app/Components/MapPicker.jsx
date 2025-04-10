"use client"; // Ensures it's a client-side component

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

// Dynamically import the Map components (client-side only)
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const useMapEvents = dynamic(() => import("react-leaflet").then((mod) => mod.useMapEvents), { ssr: false });

const DEFAULT_POSITION = [51.505, -0.09]; // Default center (London)

function LocationMarker({ setPosition }) {
    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });
    return null;
}

export default function AddressMap({ onLocationSelect }) {
    const [position, setPosition] = useState(DEFAULT_POSITION);
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [isClient, setIsClient] = useState(false);

    // Ensures Leaflet is loaded only on the client
    useEffect(() => {
        setIsClient(true);
    }, []);

    const getMyLocation = (e) => {
        e.preventDefault();

        if (navigator.geolocation) {
            setError("");
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);
                },
                () => setError("⚠️ Location access denied! Please enable location services.")
            );
        } else {
            setError("⚠️ Geolocation is not supported by your browser.");
        }
    };

    const searchPlace = async (e) => {
        e.preventDefault();

        if (!address) {
            setError("⚠️ Please enter an address.");
            return;
        }
        try {
            setError("");
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
            );
            const data = await res.json();
            if (data.length > 0) {
                setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
            } else {
                setError("⚠️ Place not found! Try another address.");
            }
        } catch (error) {
            setError("⚠️ Error searching for place. Please try again.");
        }
    };

    if (!isClient) return null; // Ensure the map only renders on the client side

    return (
        <div className="flex flex-col items-center p-4 space-y-4 bg-white shadow-md rounded-lg w-full max-w-lg">
            <h2 className="text-xl font-bold text-gray-800">Select Delivery Location</h2>

            <div className="flex w-full space-x-2">
                <input
                    type="text"
                    placeholder="Search for a place..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="button"
                    onClick={searchPlace}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Search
                </button>
            </div>

            <button
                onClick={getMyLocation}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
                Get My Location
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="w-full h-[400px] rounded-lg overflow-hidden border">
                <MapContainer center={position} zoom={13} className="h-full w-full">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position} />
                    <LocationMarker setPosition={setPosition} />
                </MapContainer>
            </div>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    onLocationSelect(position)
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Confirm Location
            </button>
        </div>
    );
}
