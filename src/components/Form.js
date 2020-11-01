import React, { useState } from "react";
import axios from 'axios';
import TextField from '@material-ui/core/TextField'

function Form( props){
    ///STATEs
    const FORM_INIT_STATE = {
        phoneNumber: "",
        accessCode: ""
    }
    const SERVER_INIT_STATE = {
        isGenerated: false,
        success: false,
        message: ""
    }
   const [form, setForm] = useState(FORM_INIT_STATE);
   const [serverInfo, setServerInfo] = useState(SERVER_INIT_STATE);

    function changeHandlor(event) {
        const {name, value} = event.target;
        setForm(() =>{
            return {
                ...form,
                [name]: value
            }
        });

    }

    //Handling the submit button
    // 1 - Check whether the user have gotten an access code. Generating new code through the /CreateNewAccessCode route and updating the serverInfo
    // 2 - else Validating the provided code through the /ValidateAccessCode route and updating the serverInfo
    // 3 - reset the state of SERVER and FORM if the user wants to get new code after validation
    function clickHandlor(event) {
        event.preventDefault();
       
            //Create new access code
        if(serverInfo.isGenerated === false && serverInfo.success === false) {
            const user = form;
            console.log(user)
            axios.post('/CreateNewAccessCode', user )
            .then((res) =>{
                setServerInfo( () => {
                    return {
                        ...serverInfo,
                        ...res.data
                    };
                });
            }).catch((err) => {
                setServerInfo(() =>{
                    return {
                        ...serverInfo,
                        ...err.response.data
                    }
                })
            });
        }else if(serverInfo.isGenerated === true && serverInfo.success === false) {

            //Validate access code
            const userData = {
                phoneNumber:form.phoneNumber,
                accessCode: form.accessCode
            }
            axios.post('/ValidateAccessCode', userData)
            .then((res) => {
                setServerInfo(() => {
                    return {
                    ...serverInfo,
                    ...res.data
                    };
                });
                
            })
            .catch((err) => {
                setServerInfo(() =>{
                    return {
                        ...serverInfo,
                        ...err.response.data
                    }
                })
            });
        }///clear
        else if(serverInfo.isGenerated === false && serverInfo.success === true){
            setForm(FORM_INIT_STATE);
            setServerInfo(SERVER_INIT_STATE);
        }

    }
    //render the form
    // 1- only display the phoneNumber field if the user access the page for the first time or he just validated his prev code 
    // 2- display both phoneNumber field and accessCode field if the user just submitted his phone number 
    // 3- change the button content from 'Get Code' to 'Submit' after the user submitted his phone number 
    //  - and vice versa if the user access the page for the first time or he just validated his prev code 
    return(
        <div>
            <form style={{textAlign: "center", marginTop: 10+"%"}}>
                <TextField 
                    type="text"
                    name="phoneNumber"
                    onChange={changeHandlor}
                    placeholder="Phone number"
                    value={form.phoneNumber}
                    helperText={serverInfo.isGenerated ? "" : serverInfo.message}//avoid display message in both phoneNumber and accessCode when user provide an invalid code
                    style={{marginBottom: .75+'em'}}
                    />
                    <br />
                {//
                }
               {serverInfo.isGenerated && <TextField
                    type="text"
                    name="accessCode"
                    onChange={changeHandlor}
                    placeholder="Access code"
                    value={form.accessCode}
                    helperText={serverInfo.message}
                    style={{marginBottom: .75+'em'}}
                    />}
                    <br />
                <button  onClick={clickHandlor} type="submit">{serverInfo.isGenerated ? "Submit": "Get Code" } </button>

            </form>
        </div>
    );
}

export default Form;