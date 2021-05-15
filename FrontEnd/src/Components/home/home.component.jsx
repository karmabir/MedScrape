import axios from 'axios';

import React, { Component } from 'react';

class HomePage extends Component {

    state = {

        selectedFile: null
    };

    onFileChange = event => {

        this.setState({ selectedFile: event.target.files[0] });

    };

    // On file upload (click the upload button)
    onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "upload",
            this.state.selectedFile
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);
        axios.post("http://localhost:8000/predict/", formData);
    };

    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {

        return (
            <div>
                <h1>
                    GeeksforGeeks
            </h1>
                <h3>
                    File Upload using React!
            </h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                </button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default HomePage;