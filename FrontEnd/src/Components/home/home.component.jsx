import axios from 'axios';
import React, { Component } from 'react';
import './home.style.css'
import { withRouter } from 'react-router';

class HomePage extends Component {
    constructor(props){
        super();
        this.state={
            selectedFile: null,
            redirect: false
        }
    }

    dragOver = (e) => {
        e.preventDefault();
    }

    dragEnter = (e) => {
        e.preventDefault();
    }

    dragLeave = (e) => {
        e.preventDefault();
    }


    fileDrop = (e) => {
        e.preventDefault();
        if(e.target.name==="dragone"){
            const files = e.dataTransfer.files;
        if (files.length) {
            const formData = new FormData();
            formData.append(
                "upload",
                files[0]
            );
            axios.post("http://18.191.173.17:8000/predict/", formData).then(response =>{
                this.props.history.push({
                    pathname:"/medinfo",
                    state:{
                        key: response.data.Medicine
                     }
                   });
              }).catch(err =>{
                console.log(err);
              })
              
        }
        }
        else if(e.target.name==="clickone"){
            const formData = new FormData();
            formData.append(
                "upload",
                e.target.files[0]
            );
            axios.post("http://18.191.173.17:8000/predict/", formData).then(response =>{
                this.props.history.push({
                    pathname:"/medinfo",
                    state:{
                        key: response.data.Medicine
                     }
                   });
              }).catch(err =>{
                console.log(err);
              })
        }
    }
    render() {
        return (
            <div>
                <div className="wrapper" id="app" >
                    <div className="card-form">
                        <div className="card-list">
                            <div className="card-form__i">
                                <p className="title pb-4 pt-1">Drag and Drop Medicine Image Upload</p>
                                <div className="content">
                                    <div className="container">

                                        <div className="drop-container" name="dropone" onDragOver={this.dragOver}

                                            onDragEnter={this.dragEnter}
                                            onDragLeave={this.dragLeave}
                                            onDrop={this.fileDrop}>
                                            <input className="clicktoupload" name ="clickone" onChange={this.fileDrop} type="file" />
                                            <div className="drop-message">
                                                <div className="upload-icon">
                                                </div>
                                                     Drag & Drop image here or click to upload
                                                </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(HomePage);