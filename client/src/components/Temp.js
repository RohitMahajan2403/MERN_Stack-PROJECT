import React, { useState, useEffect } from 'react';
import "./Temp.css";

const Temp = () => {
    
    const [temperature, setTemperature] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3fd0a2f685e5e84a8ea1c165a61b5ae1`)
                    .then(response => response.json())
                    .then(data => {
                        const temperature = (data.main.temp - 273.15).toFixed(2); 
                        setTemperature(temperature);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching weather:', error);
                        setError('Error fetching weather');
                    });
            });
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    if (loading) {
        return <p className='temp-fail'>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <p className='temp-success'>Temperature: {temperature}°C</p>
        </div>
    );
};

export default Temp;
