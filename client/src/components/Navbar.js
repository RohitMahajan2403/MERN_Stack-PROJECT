import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "./Navbar.css"

const Navbar = () => {    
    const [data, setData] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    useEffect(() => {
        fetchData(); // Fetch data on initial render
    }, []);

    useEffect(() => {
        if (startTime !== null && endTime !== null) {
            filterData();
        }
    }, [startTime, endTime]);

    const fetchData = async () => {
        try {
            const res = await axios.get('/');
            setData(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDurationClick = async (duration) => {
        try {
            const start = new Date(data[0].ts); 
            const end = new Date(start); 

            end.setHours(start.getHours() + duration); 

            setStartTime(start.toISOString());
            setEndTime(end.toISOString());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const filterData = () => {
        const filteredData = data.filter(entry => {
            const entryDate = new Date(entry.ts);
            return entryDate >= new Date(startTime) && entryDate <= new Date(endTime);
        });
        setData(filteredData);
    };

    
    const generateSegments = () => {
        const segments = [];
        const interval = (endTime - startTime) / data.length; 
        let currentTime = new Date(startTime);
        
        data.forEach(entry => {
            let color = 'red'; 
            
            if (entry.machine_status === 0) {
                color = 'yellow';
            } else if (entry.machine_status === 1) {
                color = 'green';
            }
            
            const timeString = currentTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            segments.push(
                <div key={`${entry.ts}-segment`} className={`segment color-${color}`} style={{width: 'calc(100% / ' + data.length + ')'}}>
                    {timeString}
                </div>
            );
            currentTime.setTime(currentTime.getTime() + interval);
        });

        return segments;
    };

    return (
        <>
            <div className='container-fluid'>
                <div className='header'>
                
                    <button className='btn btn-light' onClick={() => handleDurationClick(1)}>1 hr</button>{' '}
                    <button className='btn btn-primary' onClick={() => handleDurationClick(8)}>8 hr</button>{' '}
                    <button className='btn btn-secondary' onClick={() => handleDurationClick(24)}>24 hr</button>{' '}
                    
                </div>
            </div>
            <div>
                <h5>Cycle Status</h5>
                <div className="color-bar">
                    {generateSegments()}
                </div>
            </div>
                <br/>
                <hr/>
        </>
    );
};

export default Navbar;
