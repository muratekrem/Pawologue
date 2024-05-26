import React, { useState } from 'react';
import Navbar from '../Navbar';

const CatMatchForm = () => {
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const features = [
            parseFloat(e.target.feature1.value),
            parseFloat(e.target.feature2.value),
            parseFloat(e.target.feature3.value),
            parseFloat(e.target.feature4.value),
            parseFloat(e.target.feature5.value),
            parseFloat(e.target.feature6.value)
        ];

        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ features })
            });

            const resultData = await response.json();
            setResult('Recommended Indices: ' + resultData.indices.join(', '));
        } catch (error) {
            console.error('Error fetching data:', error);
            setResult('Error fetching data');
        }
    };

    return (
        <div>
            <Navbar></Navbar>    
        <div className="container">
            <h1>Cat Match</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="feature1">Breed:</label>
                <select id="feature1" name="feature1">
                    <option value="00001">Siyam Kedisi</option>
                    <option value="00010">Maine Coon</option>
                    <option value="00011">Scottish Fold</option>
                    <option value="00100">Sphynx</option>
                    <option value="00101">British Shorthair</option>
                    <option value="00110">Persian</option>
                    <option value="00111">Ragdoll</option>
                    <option value="01000">Bengal</option>
                    <option value="01001">Turkish Van</option>
                    <option value="01010">Abyssinian</option>
                    <option value="01011">Birman</option>
                    <option value="01100">Exotic Shorthair</option>
                    <option value="01101">Devon Rex</option>
                    <option value="01110">Oriental</option>
                    <option value="01111">Burmese</option>
                    <option value="10000">Russian Blue</option>
                    <option value="10001">American Shorthair</option>
                    <option value="10010">Cornish Rex</option>
                    <option value="10011">Turkish Angora</option>
                    <option value="10100">Tonkinese</option>
                </select>
                <label htmlFor="feature2">Age:</label>
                <select id="feature2" name="feature2">
                    <option value="0010">2</option>
                    <option value="0011">3</option>
                    <option value="0100">4</option>
                    <option value="0101">5</option>
                    <option value="0110">6</option>
                    <option value="0111">7</option>
                    <option value="1000">8</option>
                    <option value="1001">9</option>
                    <option value="1010">10</option>
                    <option value="1011">11</option>
                    <option value="1100">12</option>
                    <option value="1101">13</option>
                    <option value="1110">14</option>
                </select>
                <label htmlFor="feature3">Characteristic Features:</label>
                <select id="feature3" name="feature3">
                    <option value="0001">Konuşkan</option>
                    <option value="0010">Sevecen</option>
                    <option value="0011">Kıvrık Kulaklar</option>
                    <option value="0100">Meraklı</option>
                    <option value="0101">Sakin</option>
                    <option value="0110">Zeki</option>
                    <option value="0111">Uysal</option>
                    <option value="1000">Enerjik</option>
                    <option value="1001">Oyuncu</option>
                    <option value="1010">Aktif</option>
                    <option value="1011">Dostça</option>
                </select>
                <label htmlFor="feature4">Color Of Eye:</label>
                <select id="feature4" name="feature4">
                    <option value="0001">Mavi</option>
                    <option value="0010">Altın</option>
                    <option value="0011">Yeşil</option>
                    <option value="0100">Altın-Yeşil</option>
                    <option value="0101">Sarı</option>
                    <option value="0110">Altın-Mavi</option>
                    <option value="0111">Yeşil-Mavi</option>
                </select>
                <label htmlFor="feature5">Types Of Fur:</label>
                <select id="feature5" name="feature5">
                    <option value="001">Kısa</option>
                    <option value="010">Uzun</option>
                    <option value="011">Kısa-Dalgalı</option>
                    <option value="100">Tüysüz</option>
                </select>
                <label htmlFor="feature6">Common Disease:</label>
                <select id="feature6" name="feature6">
                    <option value="0001">Kronik Böbrek Hastalığı</option>
                    <option value="0010">Hipertrofik Kardiyomiyopati (HCM)</option>
                    <option value="0011">Osteochondrodysplasia (Kıkırdak Displazisi)</option>
                    <option value="0100">Egzema</option>
                    <option value="0101">Polikistik Böbrek Hastalığı (PKD)</option>
                    <option value="0110">Kalça Displazisi, Patella Luxation</option>
                    <option value="0111">Kalıtsal Hiperkalemi (KHT), Fakomelamikroftalmi</option>
                    <option value="1000">Periodontal Hastalık</option>
                    <option value="1001">Glokom</option>
                    <option value="1010">Kalıtsal Saç Dökülmesi</option>
                    <option value="1100">Sağlıklı</option>
                </select>
                <button type="submit">Find Match</button>
            </form>
            <div id="result">{result}</div>
        </div>
        </div>
    );
};

export default CatMatchForm;
