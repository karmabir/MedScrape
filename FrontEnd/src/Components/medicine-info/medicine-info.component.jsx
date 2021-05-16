import React from 'react';
import './medicine-info.style.css';
import icon from '../images/11.png'
import axios from 'axios';
class MedicineInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            mediciinename:"",
            introduction:"",
            sideeffects:"",
            whentotake:"",
        }
    }
    componentDidMount(){
        const formData = new FormData();
            formData.append(
                "Medicine",
                this.props.location.state.key
            );
            axios.post("http://localhost:8000/information/ ", formData).then(response =>{
                this.setState({
                    medicinename:response.data.MedicineName,
                    introduction:response.data.Introduction,
                    sideeffects:response.data.SideEffects,
                    whentotake:response.data.WhenToTake
                })
              }).catch(err =>{
                console.log(err); 
              })
    }
    render(){
        return(
            <div className="wrapper-med-info" id="app" >
                    <div className="card-form-med-info">
                        <div className="card-list-med-info">
                            <div className="card-form__i-med-info">
                                <div className="row">
                                <div className="col-md-3 col-12">
                                    <img src={icon} alt="icon" className="img-fluid" />
                                    </div>
                                    <div className="offset-md-2 col-md-7 col-12">
                                        <h1 style={{fontSize:"7rem",paddingTop:"3rem"}}>{this.state.medicinename}</h1>
                                    </div>
                                </div>
                                <div className="row" style={{padding:"30px",paddingBottom:"0px"}}>
                                    <div className="col-12">
                                        <h1>Introduction</h1>
                                    </div>
                                </div>
                                <div className="row" style={{padding:"0px",paddingLeft:"30px",margin:"0px"}}>
                                    <div className="col-12">
                                        <span>
                                           {this.state.introduction}
                                        </span>
                                    </div>
                                </div>

                                <div className="row" style={{padding:"30px",paddingBottom:"0px"}}>
                                    <div className="col-12">
                                        <h1>Side Effects</h1>
                                    </div>
                                </div>
                                <div className="row" style={{padding:"0px",paddingLeft:"30px",margin:"0px"}}>
                                    <div className="col-12">
                                        <span>
                                        {this.state.sideeffects}
                                        </span>
                                    </div>
                                </div>

                                <div className="row" style={{padding:"30px",paddingBottom:"0px"}}>
                                    <div className="col-12">
                                        <h1>When to Take</h1>
                                    </div>
                                </div>
                                <div className="row" style={{padding:"0px",paddingLeft:"30px",margin:"0px"}}>
                                    <div className="col-12">
                                        <span>
                                        {this.state.whentotake}
                                        </span>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
export default MedicineInfo ;