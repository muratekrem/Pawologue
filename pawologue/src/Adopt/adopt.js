import React from 'react';
import Navbar from '../Navbar';

const Adopt = ({ petInfo }) => {
    return (
        <div>
            <Navbar />
            <h2>Adopting</h2>
            {petInfo && (
                <div>
                    <p>Name: {petInfo.name}</p>
                    <p>Type: {petInfo.type}</p>
                    
                    

                </div>
            )}
        </div>
    );
}

export default Adopt;
