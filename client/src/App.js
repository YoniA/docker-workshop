import { useState } from 'react';
import './App.css';

const host = process.env.SERVER_HOST || 'localhost';
const port = process.env.SERVER_PORT || '8080';

function AddValue() {
    const [value, setValue] = useState();
    const [key, setKey] = useState();
    const setValueInServer = () => {
        fetch(`http://${host}:${port}/set`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ key, value }),
        })
            .then(() => {
                setValue('');
                setKey('');
                alert('Success');
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };
    return (
        <div>
            <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Key"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Value"
            />
            <button onClick={setValueInServer}>SET</button>
        </div>
    );
}

function GetValue() {
    const [key, setKey] = useState();
    const [value, setValue] = useState();

    const getValueFromServer = () => {
        fetch(`http://${host}:${port}/get/${key}`)
            .then((response) => response.json())
            .then((body) => {
                console.log(body);
                setValue(body.value);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };
    return (
        <div>
            <input
                type="text"
                onChange={(e) => setKey(e.target.value)}
                placeholder="Key"
            />
            <button onClick={getValueFromServer}>GET</button>
            <div>{value}</div>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <h1>Redis Demo App</h1>
            <div className="container">
                <div>
                    <h2>Set Value</h2>
                    <AddValue />
                </div>

                <div>
                    <h2>Get Value</h2>
                    <GetValue />
                </div>
            </div>
        </div>
    );
}

export default App;
